import { Entity } from 'app/model/entity';

export interface User extends Entity {
    Uid: string;
    Email: string;
    FullName: string;
    FullLastName: string;
    Birthday: Date;
    Date: Date;
    ProfileImage: string;
    Company: boolean;
    /* Aqui es donde iran los usuarios normales, asociaciones y demas */
}