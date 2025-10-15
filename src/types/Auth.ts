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

export enum UserRole {
  Admin = "admin",
  User = "user",
}

export type LoginResponse = {
  id: number;
  email: string;
  username: string;
  role: UserRole;
  token: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ForgotPasswordResponse = {
  message: string;
  token?: string;
};

export type ResetPasswordRequest = {
  token: string;
  newPassword: string;
};

export type ResetPasswordResponse = {
  message: string;
};
