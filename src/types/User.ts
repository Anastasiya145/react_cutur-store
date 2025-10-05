export type User = {
  email: string;
  username: string;
};

export type ConnectedUser = {
  email: string;
  username: string;
  address?: string;
  userRole?: string;
};
