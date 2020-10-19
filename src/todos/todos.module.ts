import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { todosProvider } from './todos.providers';

@Module({
  controllers: [TodosController],
  providers: [TodosService, ...todosProvider],
  exports: [TodosService]
})
export class TodosModule {}
