import { Entity } from 'app/model/entity';

export interface User extends Entity {
    Uid: string;
    Email: string;
    Username: string;
    FullName: string;
    FullLastName: string;
    Birthday: Date;
    Date: Date;
    ProfileImage: string;
    /* Aqui es donde iran los usuarios normales, asociaciones y demas */
}