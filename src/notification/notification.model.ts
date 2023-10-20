
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { EnumDataType } from 'sequelize';
import { NotificationTypesEnum } from './enums/notification_types';

@Table({
    timestamps: true
})
export class Notification extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    userId: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    notificationId: string;

    @Column({
        type: DataType.ENUM(...Object.values(NotificationTypesEnum)),
        allowNull: true
    })
    notificationType: EnumDataType<NotificationTypesEnum>

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    message: string

    @Column({
        type: DataType.BOOLEAN,
        allowNull: true
    })
    isRead: boolean
}
