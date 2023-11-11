import { Controller, Get, Param, Post, Body, Put, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from './dto/todo.dto';
import { ToDoFilter } from './dto/toDoFilter';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() data: TodoDto) {
    console.log("cfeat.................")
    return this.todoService.create(data);
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.todoService.findOneById(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: TodoDto) {
    return this.todoService.update(Number(id), data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.todoService.delete(Number(id));
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: string,@Query() query:ToDoFilter) {
    return this.todoService.findByStatus(status);
  }
  @Get()
  find(@Query() query:ToDoFilter) {
    return this.todoService.findAll();
  }
}
