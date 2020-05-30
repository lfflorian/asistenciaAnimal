import { Entity } from 'app/model/entity';

export interface PrivateConsultation extends Entity {
    idAuthor: string;
    idUser : string;
    Date : Date;
    Messages: Message[];
}

export interface Message extends Entity {
    Content: string;
    idUser : string;
    Date : Date;
    Images: string[];
}