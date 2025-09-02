import { Controller, Get , Param, ValidationPipe , ParseIntPipe, NotFoundException} from '@nestjs/common';
import { AppService , UsersService } from './app.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpodateUserDto } from './dto/Update-user-dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAllUsres(): string {
    return this.userService.getUsers();
  }
  @Get(':id')
  getUserById(@Param('id') id: string ): string {
    const user = this.userService.getUser(id);
    if (!user)
      throw new NotFoundException('User not found');

    return JSON.stringify(user);
  }
}
