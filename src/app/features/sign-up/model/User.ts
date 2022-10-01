import { UserRole } from './UserRole';

export interface User {
  username: string,
  password: string,
  role: UserRole
}
