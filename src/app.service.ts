import { Injectable } from '@nestjs/common';
import { User } from './user-module/interface/user';

@Injectable()
export class AppService {
    public users: User[]
  getHello(): User[] {
    return this.users;
  }
  addUser(user: User): User{
    this.users.push(user);
    return user;
  }

  deleteUser(email: string): User[]{
    const newUser = this.users.filter(i => i.email !== email)
    this.users = newUser;
    return newUser
  }
}
