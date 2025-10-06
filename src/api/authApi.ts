import {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "../types/Auth";
import { request } from "./api";

export const register = (data: RegisterRequest) =>
  request<RegisterResponse>("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const login = (data: LoginRequest) =>
  request<LoginResponse>("/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const forgotPassword = (data: ForgotPasswordRequest) =>
  request<ForgotPasswordResponse>("/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const resetPassword = (data: ResetPasswordRequest) =>
  request<ResetPasswordResponse>("/reset-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
