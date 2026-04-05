import type { UserProfile } from "@/features/profile/types/profile.type";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  name: string;
};

export type LoginResult = {
  user: UserProfile;
  token: string;
};
