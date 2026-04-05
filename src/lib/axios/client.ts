import axios, { AxiosError } from "axios";

type ApiErrorPayload = {
  success?: false;
  message?: string;
  errors?: Array<{ field?: string; message: string }>;
};

const TOKEN_KEY = "auth_token";
const EXPIRES_AT_KEY = "auth_token_expires_at";
const SESSION_DURATION = 1000 * 60 * 60; // 1 jam

const PUBLIC_ROUTES = ["/auth/login", "/auth/register"];

export const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window === "undefined") return config;

  const requestUrl = config.url ?? "";
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    requestUrl.startsWith(route),
  );

  // Login/Register tidak butuh token
  if (isPublicRoute) return config;

  const token = window.localStorage.getItem(TOKEN_KEY);
  const expiresAtStr = window.localStorage.getItem(EXPIRES_AT_KEY);
  const expiresAt = expiresAtStr ? Number(expiresAtStr) : null;

  if (!token || !expiresAt || Date.now() > expiresAt) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(EXPIRES_AT_KEY);

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
    window.localStorage.setItem(TOKEN_KEY, token);
    window.localStorage.setItem(EXPIRES_AT_KEY, String(expiresAt));
  }
}

export function clearAuthToken(): void {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(EXPIRES_AT_KEY);
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
