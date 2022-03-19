import { Injectable, Inject } from '@nestjs/common';
import { AddUserDto } from './dto/add-user.dto';
import { UserListOptions } from './interfaces/service.interface.ts';
import { User } from './interfaces/user.interface';
import { USER_REPOSITORY_KEY } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY_KEY)
    private readonly userRepository: User[],
  ) {}

  list(options?: UserListOptions): User[] {
    if (!options) {
      return [...this.userRepository];
    }

    const { pageIndex = 1, pageSize = 10 } = options;
    const start = (pageIndex - 1) * pageSize;
    return this.userRepository.slice(start, start + pageSize);
  }

  getUserById(id: number): User | null {
    return this.userRepository.find((item) => item.id === id) ?? null;
  }

  addUser(dto: AddUserDto): User {
    const user: User = {
      id: this.userRepository.length + 1,
      ...dto,
    };
    this.userRepository.push(user);
    return user;
  }

  deleteUserById(id: number): boolean {
    const index = this.userRepository.findIndex((item) => item.id === id);
    if (index < 0) {
      return false;
    }

    this.userRepository.splice(index, 1);
    return true;
  }
}
