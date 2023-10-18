
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Gender } from './enums/gender_enum';
import { EnumDataType } from 'sequelize';

@Table({
    timestamps: true
})
export class Profile extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    userId: string;

    @Column({
        type: DataType.ENUM(...Object.values(Gender)),
        allowNull: true
    })
    gender: EnumDataType<Gender>

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    phoneNumber: string

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    province: string

    @Column({
        type: DataType.JSON,
        allowNull: true
    })
    address: string
}
