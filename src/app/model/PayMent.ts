import { Entity } from 'app/model/entity';


export interface PayMent extends Entity {
    Name: string;
    Email: string;
    Phone: string;
    Date: Date;
}