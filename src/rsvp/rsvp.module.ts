import { Module } from '@nestjs/common';
import { RsvpService } from './rsvp.service';
import { RsvpController } from './rsvp.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Rsvp } from './rsvp.model';
import { RsvpRepository } from './rsvp.repository';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [
    NotificationModule,
    SequelizeModule.forFeature([Rsvp])
  ],
  controllers: [RsvpController],
  providers: [RsvpService, RsvpRepository],
})
export class RsvpModule {}
