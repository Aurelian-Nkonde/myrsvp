import { Gender } from "../enums/gender_enum";

export class Profile {
    id?: string;
    userId: any;
    gender: Gender;
    phoneNumber: string;
    province: string;
    address: string
}
