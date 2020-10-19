import { Table, Model, Column, DataType, ForeignKey, BelongsTo, CreatedAt, UpdatedAt} from "sequelize-typescript";

@Table
export class Lottery extends Model<Lottery> {
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
  
}