import { Controller, Get, Param, NotFoundException, Put, UseGuards, Post, Body, Request, Delete } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';
import { AuthGuard } from '@nestjs/passport';
import { TodoDto } from './dto/todo.dto';


@Controller('todos')
export class TodosController {
    constructor(private readonly todoService:TodosService) {}

    // @Get()
    // async findAll(){
    //     return await this.todoService.findAll();
    // }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async findAllByUser(@Request() req){
        return await this.todoService.findAllByUser(req.user.id);
    }

    @Get(':id')
    async findOne(@Param('id') id:number):Promise<Todo>{
        const todo = await this.todoService.findOne(id);

        if (!todo){
            throw new NotFoundException('Todo Not Found')
        }
        return todo; 
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() todo: TodoDto, @Request() req): Promise<Todo>{
        console.log('Step 2: TodosController')
        return await this.todoService.create(todo, req.user.id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id:number, @Body() todo:TodoDto, @Request() req): Promise<boolean>{
        console.log('todo', todo);

        const {numberOfAffectedRows} = await this.todoService.update(id, todo, req.user.id)

        if (numberOfAffectedRows === 0){    
            throw new NotFoundException("Todo Not Found");
        }
        
        return true;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async delete(@Param('id') id: number, @Request() req){
        
        const deleted = await this.todoService.delete(id, req.user.id);

        if (deleted === 0){    
            throw new NotFoundException("Todo Not Found");
        }
        return 'Successfully Deleted';
    }
  

}
