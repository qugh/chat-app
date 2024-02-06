import { Column, DataType, Model, Table } from 'sequelize-typescript';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

@Table({ tableName: 'messages' })
export class Message extends Model<
  InferAttributes<Message>,
  InferCreationAttributes<Message>
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: CreationOptional<number>;

  @Column({
    allowNull: false,
  })
  declare content: string;

  @Column({
    type: DataType.DATE,
  })
  declare createdAt: CreationOptional<Date>;
}
