import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    TypeOrmModule.forRoot({    
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'emailPrueba',
      entities: [User],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule, 
    MailModule,

   ],
  controllers: [AppController],
  providers: [AppService,MailService],
})
export class AppModule {}
