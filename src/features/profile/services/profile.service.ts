import { axiosInstance } from "@/lib/axios/client";
import type { ApiResponse } from "@/types/api";
import type { UserProfile } from "@/features/profile/types/profile.type";

type UpdateProfilePayload = {
  name: string;
  email: string;
};

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

export async function getProfile(): Promise<UserProfile> {
  const res = await axiosInstance.get<ApiResponse<UserProfile>>("/profile");
  return unwrapApiResponse(res.data);
}

export async function updateProfile(
  payload: UpdateProfilePayload,
): Promise<UserProfile> {
  const res = await axiosInstance.patch<ApiResponse<UserProfile>>(
    "/profile",
    payload,
  );
  return unwrapApiResponse(res.data);
}
