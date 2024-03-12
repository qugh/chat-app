import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { User } from '@server/users/users.model';

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

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @Column({ type: DataType.STRING })
  email: string;

  @BelongsTo(() => User)
  author: User;
}
