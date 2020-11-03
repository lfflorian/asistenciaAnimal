import { Entity } from 'app/model/entity';


export interface Contact extends Entity {
    Name: string;
    Email: string;
    Description: string;
    Date: Date;
}