import { Entity } from 'app/model/entity';

export interface PrivateConsultation extends Entity {
    IdHost: string;
    idInvited : string;
    CompanyName: string;
    UserName: string;
    Date : Date;
    Messages: Message[];
}

export interface Message extends Entity {
    Content: string;
    idUser : string;
    Date : Date;
    Images: string[];
}