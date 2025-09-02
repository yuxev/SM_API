import { Controller, Get, Param, ValidationPipe, ParseIntPipe, NotFoundException, Post, Body, Delete, Patch } from '@nestjs/common';
import { AppService, UsersService } from './app.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpodateUserDto } from './dto/Update-user-dto';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) { }

	@Get()
	getHello(): string {
		return this.appService.getHello();
	}
}

@Controller('users')
export class UsersController {
	constructor(private readonly userService: UsersService) { }

	@Get()
	getAllUsres(): string {
		return this.userService.getUsers();
	}

	@Get(':id')
	getUserById(@Param('id') id: string): string {
		const user = this.userService.getUser(id);
		if (!user)
			throw new NotFoundException('User not found');
		return JSON.stringify(user);
	}

	@Post('create')
	createUser(@Body() dto: CreateUserDto, ValidationPipe): CreateUserDto {
		return this.userService.createUser(dto);
	}

	@Delete('delete/:id')
	deleteUser(@Param('id') id: string): string {
		return this.userService.deleteUser(id);
	}

	@Patch('update/:id')
	updateUser(@Param('id') id: string, @Body() dto: UpodateUserDto): CreateUserDto & { id: string; createdAt?: string } {
		return this.userService.updateUser(id, dto);
	}
}
