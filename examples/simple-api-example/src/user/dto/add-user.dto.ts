import { User } from '../interfaces/user.interface';

export type AddUserDto = Omit<User, 'id'>;
