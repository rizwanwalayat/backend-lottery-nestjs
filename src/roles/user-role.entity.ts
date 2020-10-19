import {Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { Role } from './role.entity';

@Table
export class userRole extends Model<userRole>{
    
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId: number;

    @ForeignKey(() => Role)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    roleId: number;

   
    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Role)
    role: Role;
    
}