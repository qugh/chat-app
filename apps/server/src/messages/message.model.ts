import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface MessageCreationAttributes {
  content: string;
}

@Table({ tableName: 'messages' })
export class Message extends Model<Message, MessageCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  public id: number;

  @Column({
    allowNull: false,
  })
  public content: string;

  @Column({
    type: DataType.DATE,
  })
  createdAt: Date;
}
