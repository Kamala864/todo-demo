import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from '../../src/todo/todo.service';
import { PrismaService } from '../../src/prisma/prisma.service';

describe('TodoService', () => {
  let service: TodoService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService, PrismaService],
    }).compile();

    service = module.get<TodoService>(TodoService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  const mockTodo = {
    id: 1,
    taskName: 'Test Task',
    description: 'Test Description',
    status: 'incomplete',
    createdAt: new Date(),
  };

  describe('create', () => {
    it('should create a new todo', async () => {
      jest.spyOn(prisma.todo, 'create').mockResolvedValue(mockTodo);

      const result = await service.create({} as any);

      expect(result).toEqual(mockTodo);
    });
  });

  describe('findOneById', () => {
    it('should find a todo by ID', async () => {
      jest.spyOn(prisma.todo, 'findUnique').mockResolvedValue(mockTodo);

      const result = await service.findOneById(1);

      expect(result).toEqual(mockTodo);
    });
  });

  describe('update', () => {
    it('should update a todo by ID', async () => {
      jest.spyOn(prisma.todo, 'update').mockResolvedValue(mockTodo);

      const result = await service.update(1, {} as any); 
      expect(result).toEqual(mockTodo);
    });
  });

  describe('delete', () => {
    it('should delete a todo by ID', async () => {
      jest.spyOn(prisma.todo, 'delete').mockResolvedValue(mockTodo);

      const result = await service.delete(1);

      expect(result).toEqual(mockTodo);
    });
  });

  describe('findByStatus', () => {
    it('should find todos by status', async () => {
      const status = 'incomplete';
      const mockTodos = [mockTodo];

      jest.spyOn(prisma.todo, 'findMany').mockResolvedValue(mockTodos);

      const result = await service.findByStatus(status);

      expect(result).toEqual(mockTodos);
    });
  });

  describe('findAll', () => {
    it('should find all todos', async () => {
      const mockTodos = [mockTodo];

      jest.spyOn(prisma.todo, 'findMany').mockResolvedValue(mockTodos);

      const result = await service.findAll();

      expect(result).toEqual(mockTodos);
    });
  });
});
