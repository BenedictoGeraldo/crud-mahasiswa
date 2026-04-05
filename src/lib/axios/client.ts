import axios, { AxiosError } from "axios";

type ApiErrorPayload = {
  success?: false;
  message?: string;
  errors?: Array<{ field?: string; message: string }>;
};

const TOKEN_KEY = "auth_token";
const EXPIRES_AT_KEY = "auth_token_expires_at";
const SESSION_DURATION = 1000 * 60 * 60;

const TOKEN_COOKIE = "auth_token";
const EXPIRES_COOKIE = "auth_token_expires_at";

const PUBLIC_ROUTES = ["/auth/login", "/auth/register"];

export const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

function setCookie(name: string, value: string, maxAgeSeconds: number) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax`;
}

function clearCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax`;
}

axiosInstance.interceptors.request.use((config) => {
  if (typeof window === "undefined") return config;

  const requestUrl = config.url ?? "";
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    requestUrl.startsWith(route),
  );

  if (isPublicRoute) return config;

  const token = window.localStorage.getItem(TOKEN_KEY);
  const expiresAtStr = window.localStorage.getItem(EXPIRES_AT_KEY);
  const expiresAt = expiresAtStr ? Number(expiresAtStr) : null;

  if (!token || !expiresAt || Date.now() > expiresAt) {
    clearAuthToken();

    if (Date.now() > (expiresAt ?? 0)) {
      window.location.href = "/login";
    }

    return Promise.reject(
      new Error("Sesi telah habis. Silahkan login kembali."),
    );
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorPayload>) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Terjadi kesalahan pada jaringan";

    const normalizedError = {
      status: error.response?.status ?? 500,
      message,
      errors: error.response?.data?.errors ?? [],
    };

    return Promise.reject(normalizedError);
  },
);

export function setAuthToken(token: string): void {
  if (typeof window !== "undefined") {
    const expiresAt = Date.now() + SESSION_DURATION;
    const maxAge = Math.floor(SESSION_DURATION / 1000);

    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(EXPIRES_AT_KEY, String(expiresAt));

    setCookie(TOKEN_COOKIE, token, maxAge);
    setCookie(EXPIRES_COOKIE, String(expiresAt), maxAge);
  }
}

export function clearAuthToken(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(EXPIRES_AT_KEY);

    clearCookie(TOKEN_COOKIE);
    clearCookie(EXPIRES_COOKIE);
  }
}

export function isAuthenticated(): boolean {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem(TOKEN_KEY);
    const expiresAtStr = window.localStorage.getItem(EXPIRES_AT_KEY);
    const expiresAt = expiresAtStr ? Number(expiresAtStr) : null;

    return !!(token && expiresAt && Date.now() <= expiresAt);
  }

  return false;
}
