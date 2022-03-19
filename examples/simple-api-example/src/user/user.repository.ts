import { ValueProvider } from '@nestjs/common';
import { User } from './interfaces/user.interface';

const getRandomName = () => {
  const randomString = 'abcdefghijklmnopqrstuvwxyz';
  let nameLength = 0;

  while (true) {
    const length = Math.floor(Math.random() * 10);
    if (length > 3 && length < 10) {
      nameLength = length;
      break;
    }
  }

  const charList: string[] = [];
  let i = nameLength;
  while (i > 0) {
    const index = Math.floor((Math.random() * 100) % randomString.length);
    if (i === nameLength) {
      charList.push(randomString[index].toUpperCase());
    } else {
      charList.push(randomString[index]);
    }
    i--;
  }

  return charList.join('');
};

const generateUsers = (length: number = 20) => {
  const users: User[] = [];
  for (let i = 0; i < length; i++) {
    const name = getRandomName();
    users.push({
      id: i + 1,
      name,
      email: `${name.toLowerCase()}@google.com`,
      gender: (i + 1) % 2 ? 'male' : 'female',
    });
  }
  return users;
};

export const USER_REPOSITORY_KEY = 'USER_REPOSITORY';

export const userRepository: ValueProvider<User[]> = {
  provide: USER_REPOSITORY_KEY,
  useValue: generateUsers(),
};
