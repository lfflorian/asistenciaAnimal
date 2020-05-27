import { Entity } from 'app/model/entity';

export interface Company extends Entity {
    Uid: string;
    Name: string;
    Description: string;
    DateIgnauration: string;
    AsociationType: string;
    Logo: string;
    Date: Date;
    User: string;
    /* Aqui es donde iran los usuarios normales, asociaciones y demas */
}