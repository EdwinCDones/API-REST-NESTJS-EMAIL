import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    private mailerService: MailService,
    @InjectRepository(User) private repo: Repository<User>) { }
/*metodo crear usuario*/
  create(username: string, email: string, password: string) {
    const user = this.repo.create({ username, email, password });
    this.mailerService.sendUserConfirmation(user);//enviando el correo mientras se crea el usuario
    return this.repo.save(user);
  }



}
