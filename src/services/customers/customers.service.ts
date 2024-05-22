import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../../entities/customers.entity';
import { CreateCustomersDto, UpdateCustomerDto } from 'src/dtos/customers.dtos';

@Injectable()
export class CustomersService {
  private counterId = 1;
  private customers: Customer[] = [
    {
      id: 1,
      name: 'jordan',
      lastName: 'lopez',
      phone: '6376763673',
    },
  ];

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const customer = this.customers.find((item) => item.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  create(data: CreateCustomersDto) {
    this.counterId = this.counterId + 1;
    const newCustomer = {
      id: this.counterId,
      ...data,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  update(id: number, changes: UpdateCustomerDto) {
    const customer = this.findOne(id);
    if (customer) {
      const index = this.customers.findIndex((item) => item.id === id);
      this.customers[index] = {
        ...customer,
        ...changes,
      };
      return this.customers[index];
    }
    return null;
  }

  remove(id: number) {
    const customer = this.findOne(id);
    const customerIndex = this.customers.indexOf(customer);
    this.customers.splice(customerIndex, 1);
    return true;
  }
}
