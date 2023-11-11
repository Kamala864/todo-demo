import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Todo, Prisma } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TodoCreateInput): Promise<Todo> {
    return this.prisma.todo.create({ data });
  }

  async findOneById(id: number): Promise<Todo | null> {
    return this.prisma.todo.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.TodoUpdateInput): Promise<Todo> {
    return this.prisma.todo.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Todo> {
    return this.prisma.todo.delete({ where: { id } });
  }

  async findByStatus(status: string): Promise<Todo[]> {
    return  this.prisma.todo.findMany({ where: { status:status } });
  }
  async findAll(): Promise<Todo[]> {
    return  this.prisma.todo.findMany();
  }
}
