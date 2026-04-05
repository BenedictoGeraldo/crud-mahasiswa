export type UserProfile = {
  id: number;
  email: string;
  name?: string;
  is_active: boolean;
  register_date: string;
};

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
