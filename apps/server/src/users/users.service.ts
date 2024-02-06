import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from '@server/users/dto/create-user.dto';
import { ValidationException } from '@server/exceptions/validation.exception';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    // const role = await this.rolesService.getRoleByValue('user');
    // if (!role)
    //   throw new HttpException('Роль user не создана', HttpStatus.BAD_REQUEST);

    const userEntity = await this.userRepository.findOne({
      where: { email: dto.email },
    });

    if (userEntity) {
      throw new ValidationException(
        `Пользователь с email ${dto.email} уже существует`,
      );
    }

    const user = await this.userRepository.create(dto);

    // await user.$set('roles', [role.id]);
    // user.roles = [role];

    return user;
  }

  async findOne(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
}
