import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';

@Global() // 👈 optional to make module global
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({       
        /*las credenciales en transport son obtenidas desde el .env*/
        transport: {    
          service: config.get('MAIL_SERVICE'),
          port: config.get('MAIL_PORT'),
          host: config.get('MAIL_HOST'),          
          secure: false,
          auth: {
            user: config.get('MAIL_USER'),
            pass: config.get('MAIL_PASSWORD')
          },
        },
        defaults: {
          from: config.get('MAIL_FROM'),          
        },
        
        
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),//configurado en nest-cli.json
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule { }
