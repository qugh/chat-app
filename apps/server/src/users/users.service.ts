import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from '@server/users/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    // const role = await this.rolesService.getRoleByValue('user');
    // if (!role)
    //   throw new HttpException('Роль user не создана', HttpStatus.BAD_REQUEST);

    const user = await this.userRepository.create(dto);

    console.log('test123', user);
    // await user.$set('roles', [role.id]);
    // user.roles = [role];
    return user;
  }

  async findOne(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
}
