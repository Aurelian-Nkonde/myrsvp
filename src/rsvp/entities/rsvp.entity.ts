import { EventTypeEnum } from "../enums/event_type_enum";

// export class RsvpEntity {
//     userId?: string;
//     eventType:  any;
//     title: string;
//     host: string;
//     address: string;
//     description: string;
//     attending: boolean;
//     done: boolean;
//     attendees: string;
//     EventDate: Date;
//     rsvpId?: string
// }

export interface RsvpEntity {
    userId?: string;
    eventType:  any;
    title: string;
    host: string;
    address: string;
    description: string;
    attending: any;
    done: boolean;
    attendees: string;
    EventDate: Date;
    rsvpId?: string
}