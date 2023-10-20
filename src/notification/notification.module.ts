import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { NotificationRepository } from './notification.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Notification } from './notification.model';

@Module({
  imports: [SequelizeModule.forFeature([Notification])],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationRepository],
  exports: [NotificationService]
})
export class NotificationModule {}
