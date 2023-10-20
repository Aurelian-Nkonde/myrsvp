import { Injectable, NotFoundException } from '@nestjs/common';
import { NotificationRepository } from './notification.repository';
import { NotificationEntity } from './entities/notification.entity';

@Injectable()
export class NotificationService {
    constructor(private readonly notificationRepository: NotificationRepository) { }

    async createNotification(data: NotificationEntity): Promise<NotificationEntity> {
        const created = await this.notificationRepository.create(data);
        if (created) {
            return created;
        } else {
            console.error("Error creating a notification");
            throw new NotFoundException("Error creating a notification")
        }
    }

    async getNotifications(id: string): Promise<NotificationEntity[]> {
        const notifications = await this.notificationRepository.getAll(id);
        if (notifications) {
            return notifications;
        } else {
            console.error("Error getting notifications");
            throw new NotFoundException("Error getting notifications");
        }
    }

    async readNotification(id: string, userId: string): Promise<NotificationEntity> {
        const notification = await this.notificationRepository.read(id, userId);
        if (notification) {
            return notification;
        } else {
            console.error("Error reading the notification");
            throw new NotFoundException("Error reading a notification");
        }
    }
}
