import { RoleEnum } from "../enums/role_enum";

export interface UserEntity {
    role?: any,
    userId?: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string
}
