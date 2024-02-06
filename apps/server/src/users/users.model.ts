import { Column, DataType, Model, Table } from 'sequelize-typescript';
import {
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'users' })
export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: CreationOptional<number>;

  @ApiProperty({ example: 'test@mail.ru', description: 'Почта' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @ApiProperty({ example: '1234qwer', description: 'Пароль' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
}
