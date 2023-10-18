
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { EnumDataType } from 'sequelize';
import { EventTypeEnum } from './enums/event_type_enum';
import { AttendingEnum } from './enums/attending_enum';

@Table({
    timestamps: true
})

export class Rsvp extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    userId: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    rsvpId: string;

    @Column({
        type: DataType.ENUM(...Object.values(EventTypeEnum)),
        allowNull: false
    })
    eventType: EnumDataType<EventTypeEnum>

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    host: string

    @Column({
        type: DataType.JSON,
        allowNull: false
    })
    address: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description: string

    @Column({
        type: DataType.ENUM(...Object.values(AttendingEnum)),
        allowNull: false
    })
    attending: EnumDataType<AttendingEnum>

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    done: boolean

    @Column({
        type: DataType.JSON,
        allowNull: false
    })
    attendees: string

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    EventDate: Date
}
