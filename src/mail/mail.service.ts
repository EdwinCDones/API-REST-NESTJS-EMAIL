import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) { }

  async sendUserConfirmation(user: User) {
    const url = `https://github.com/EdwinCDones`;//change to api login url
    const pass = "Password01"
    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // anular el valor predeterminado de from
      subject: 'Bienvenido! Usuario Creado',
      /* confirmation.hbs la extensión se agrega automáticamente desde templates y se
      configura dentro de nest-cli.json */
      template: './confirmation',
      context: {
        name: user.username,
        temporalPassword: pass,
        url,

      },
    });
  }
}
