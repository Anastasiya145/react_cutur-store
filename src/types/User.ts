export type User = {
  email: string;
  username: string;
};

// Тип для адреса пользователя
export type Address = {
  country: string;
  city: string;
  street: string;
  postalCode: string;
  apartment?: string;
};

export type ConnectedUser = {
  id: number;
  email: string;
  username: string;
  role: string;
  address?: Address;
};

export type UpdateAddressRequest = {
  address: Address;
};

// Тип для запроса изменения пароля
export type UpdatePasswordRequest = {
  currentPassword: string;
  newPassword: string;
};

export type GetUserResponse = ConnectedUser;

export type UpdateAddressResponse = ConnectedUser;
