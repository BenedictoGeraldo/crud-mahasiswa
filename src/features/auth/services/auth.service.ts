import { axiosInstance } from "@/lib/axios/client";
import type { ApiResponse } from "@/types/api";
import type {
  LoginPayload,
  LoginResult,
  RegisterPayload,
} from "@/features/auth/types/auth.type";
import type { UserProfile } from "@/features/profile/types/profile.type";

function unwrapApiResponse<T>(payload: ApiResponse<T>): T {
  if (!payload.success) {
    throw {
      status: 400,
      message: payload.message,
      errors: payload.errors ?? [],
    };
  }

  return payload.data;
}

export async function login(payload: LoginPayload): Promise<LoginResult> {
  const response = await axiosInstance.post<ApiResponse<UserProfile>>(
    "/auth/login",
    payload,
  );

  const user = unwrapApiResponse(response.data);

  return {
    user,
    token: String(user.id),
  };
}
export async function register(payload: RegisterPayload): Promise<UserProfile> {
  const response = await axiosInstance.post<ApiResponse<UserProfile>>(
    "/auth/register",
    payload,
  );

  return unwrapApiResponse(response.data);
}
