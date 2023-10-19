import { Gender } from "../enums/gender_enum";
export interface ProfileEntity {
    userId: string;
    gender?: any;
    phoneNumber?: string;
    province?: string;
    address?: string
}