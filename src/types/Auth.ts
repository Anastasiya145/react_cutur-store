export type User = {
  id: number;
  email: string;
  username: string;
  address?: string;
  userRole?: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
  address?: string;
};

export type RegisterResponse = {
  email: string;
  username: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  id: number;
  email: string;
  username: string;
  role: "Admin" | "User";
  token: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ForgotPasswordResponse = {
  message: string;
  token?: string; // для теста, если возвращаете токен
};

export type ResetPasswordRequest = {
  token: string;
  newPassword: string;
};

export type ResetPasswordResponse = {
  message: string;
};
