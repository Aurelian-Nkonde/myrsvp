// export class Notification {}
export interface NotificationEntity {
    userId: string,
    notificationId?: string,
    message: string,
    isRead: boolean,
    notificationType: any
}
