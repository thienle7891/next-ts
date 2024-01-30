export type Role = 'admin' | 'end-user';
export type TUser = {
  username: string;
  name: string;
  role: Role;
  created_at: Date;
  updated_at: Date;
};
