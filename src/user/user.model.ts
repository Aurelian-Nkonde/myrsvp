
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { EnumDataType } from 'sequelize';
import { RoleEnum } from './enums/role_enum';

@Table({
    timestamps: true
})
export class User extends Model {

    @Column({
        type: DataType.ENUM(...Object.values(RoleEnum)),
        allowNull: false
    })
    role: EnumDataType<RoleEnum>

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    userId: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    firstName: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    lastName: string

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    email: string

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    password: string
}
