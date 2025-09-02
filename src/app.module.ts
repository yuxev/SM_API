import { Module } from '@nestjs/common';
import { AppController , UsersController } from './app.controller';
import { AppService , UsersService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController , UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
