import {Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany} from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { userRole } from './user-role.entity';

@Table
export class Role extends Model<Role>{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        allowNull: false
    })
    id: number;
    
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    role: string;

    @HasMany(() => userRole)
    userRoles: userRole[];

    
}