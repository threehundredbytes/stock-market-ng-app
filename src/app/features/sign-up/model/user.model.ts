import { UserRole } from './user-role.model';

export interface User {
  username: string,
  password: string,
  role: UserRole
}
