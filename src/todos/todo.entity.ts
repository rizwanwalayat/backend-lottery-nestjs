import { Table, Model, Column, DataType, ForeignKey, BelongsTo, CreatedAt, UpdatedAt} from "sequelize-typescript";
import { User } from "src/users/user.entity";

@Table
export class Todo extends Model<Todo> {
    @Column({
        type:DataType.STRING,
        allowNull: false,
    })
    title: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    description: string;
    
    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    completed: boolean;

    @ForeignKey(()=>User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @BelongsTo(()=>User)
    user: User;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}