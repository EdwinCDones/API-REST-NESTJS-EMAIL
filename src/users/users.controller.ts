import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.usersService.create(body.username, body.email, body.password);
  }
  
}
