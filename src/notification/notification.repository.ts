import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Notification } from './notification.model';
import { NotificationEntity } from './entities/notification.entity';
import { GenerateRsvp } from 'src/utils/generateRsvpId';

@Injectable()
export class NotificationRepository {
    constructor(
        @InjectModel(Notification)
         private notificationModel: typeof Notification
    ) { }

    async create(data: NotificationEntity): Promise<NotificationEntity> {
        data.notificationId = GenerateRsvp();
        const created = await this.notificationModel.create({ ...data });
        return created;
    }

    async getAll(id: string): Promise<NotificationEntity[]> {
        const allNotifications = await this.notificationModel.findAll({
            where: {
                userId: id
            }
        });
        return allNotifications;
    }

    async read(id: string, userId:string): Promise<NotificationEntity> {
        const notification = await this.notificationModel.findOne({
            where: {
                notificationId: id,
                userId: userId
            }
        });
        const updated = notification.update({
            isRead: true
        });
        return updated;

    }

}
