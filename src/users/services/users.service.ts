import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUsersDto, UpdateUserDto } from '../dtos/users.dto';
import { Order } from '../entities/order.entity';
import { ProductsService } from 'src/products/services/products.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private productsService: ProductsService,
    private configService: ConfigService,
  ) {}
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'product 1',
      password: '@Hleyva21',
      role: 'hjwjsj',
    },
  ];

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(apiKey, dbName);
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(data: CreateUsersDto) {
    this.counterId = this.counterId + 1;
    const newUser = {
      id: this.counterId,
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, data: UpdateUserDto) {
    const user = this.findOne(id);
    if (user) {
      const index = this.users.findIndex((item) => item.id === id);
      this.users[index] = {
        ...user,
        ...data,
      };
      return this.users[index];
    }
    return null;
  }

  remove(id: number) {
    const user = this.findOne(id);
    const userIndex = this.users.indexOf(user);
    this.users.splice(userIndex, 1);
    return user;
  }

  getOrderByUsers(id: number): Order {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
