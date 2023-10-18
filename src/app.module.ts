import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RsvpModule } from './rsvp/rsvp.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { Profile } from './profile/profile.model';
import { Rsvp } from './rsvp/rsvp.model';
import { User } from './user/user.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Thousand@90',
      database: 'future',
      autoLoadModels: true,
      synchronize: true,
      models: [Profile, Rsvp, User],
    }),
    RsvpModule,
    UserModule,
    ProfileModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
