import { Entity } from 'app/model/entity';
import { Tag } from './tag';

export interface Company extends Entity {
    Uid: string;
    Id_creator_user : string;
    Name: string;
    Description: string;
    DateIgnauration: string;
    AsociationType: string;
    Logo: string;
    Date: Date;
    Users: string[];
    tags: Tag[];
    /* Aqui es donde iran los usuarios normales, asociaciones y demas */
}