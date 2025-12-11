export type TUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  isGoogleLogged: boolean;
  password?: string;
  currentPassword?: string;
};
