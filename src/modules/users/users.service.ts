// modules/users/users.service.ts
// @ts-nocheck
/* eslint-disable */

import { Injectable } from '@nestjs/common';
import { prismaTenant } from '@/infrastructure/database';

@Injectable()
export class UsersService {
  // SEM ASYNC (retorna Promise diretamente)
  findAll() {
    return prismaTenant.user.findMany();
  }

  // COM ASYNC (precisa do await)
  async findOne(id: string) {
    const user = await prismaTenant.user.findFirst({
      where: { id },
    });

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  }

  // COM ASYNC (precisa do await)
  async create(data: any) {
    const existing = await prismaTenant.user.findFirst({
      where: { email: data.email },
    });

    if (existing) {
      throw new Error('Email já cadastrado');
    }

    const user = await prismaTenant.user.create({ data });
    return user;
  }

  // COM ASYNC (precisa do await)
  async update(id: string, data: any) {
    await this.findOne(id);
    const user = await prismaTenant.user.update({
      where: { id },
      data,
    });
    return user;
  }

  // COM ASYNC (precisa do await)
  async delete(id: string) {
    await this.findOne(id);
    const user = await prismaTenant.user.delete({
      where: { id },
    });
    return user;
  }
}
