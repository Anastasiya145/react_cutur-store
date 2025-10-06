import {
  Address,
  UpdateAddressRequest,
  UpdatePasswordRequest,
  GetUserResponse,
  UpdateAddressResponse,
} from "../types/User";
import { request } from "./api";

export const getUserByEmail = (email: string): Promise<GetUserResponse> =>
  request<GetUserResponse>(`/users/${email}`);

export const updateUserAddress = (
  email: string,
  address: Address
): Promise<UpdateAddressResponse> =>
  request<UpdateAddressResponse>(`/users/${email}/address`, {
    method: "PUT",
    body: JSON.stringify({ address } as UpdateAddressRequest),
  });

export const updateUsername = (
  email: string,
  username: string
): Promise<GetUserResponse> =>
  request<GetUserResponse>(`/users/${email}/username`, {
    method: "PUT",
    body: JSON.stringify({ username }),
  });

export const updateUserPassword = (
  email: string,
  currentPassword: string,
  newPassword: string
): Promise<{ message: string }> =>
  request<{ message: string }>(`/users/${email}/password`, {
    method: "PUT",
    body: JSON.stringify({
      currentPassword,
      newPassword,
    } as UpdatePasswordRequest),
  });
