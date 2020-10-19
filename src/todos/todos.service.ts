import { Injectable, Inject } from '@nestjs/common';
import { TODO_REPOSITORY } from 'src/core/constants';
import { Todo } from './todo.entity';
import { TodoDto } from './dto/todo.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class TodosService {
    constructor(@Inject(TODO_REPOSITORY) private readonly todoRepsitory: typeof Todo) {}

    async create(todo: TodoDto, userId): Promise<Todo>{
        console.log('Step 3: TodosService Creating Todo');
        return await this.todoRepsitory.create<Todo>({...todo, userId})
    }

    async findAll(): Promise <Todo[]>{
        return this.todoRepsitory.findAll<Todo>({
            include: [{model: User, attributes: {exclude: ['password']} }],
        });
    }

    async findAllByUser(userId): Promise <Todo[]>{
        return this.todoRepsitory.findAll<Todo>({where: {userId} });
    }

    async findOne(id): Promise <Todo>{
        return await this.todoRepsitory.findOne({
            where: {id},
            include: [{model: User, attributes: {exclude: ['password']}}]
        })
    }

    async delete(id, userId){
        return await this.todoRepsitory.destroy({where: {id, userId}})
    }

    async update(id, data, userId){
        const [numberOfAffectedRows] = await this.todoRepsitory.update({...data}, { where: {id, userId}, returning: true})
        return {numberOfAffectedRows};
    }
}
