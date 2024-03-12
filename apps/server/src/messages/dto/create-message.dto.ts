import { IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty({ message: 'Сообщение не может быть пустым' })
  readonly content: string;
}
