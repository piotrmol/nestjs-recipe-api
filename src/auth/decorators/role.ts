import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../entity/user';

export const ROLE_KEY = 'role';
export const Role = (role: UserRole) => SetMetadata(ROLE_KEY, role);
