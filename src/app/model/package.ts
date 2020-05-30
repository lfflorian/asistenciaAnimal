import { Entity } from 'app/model/entity';

export interface Package extends Entity {
    Name: string;
    Detail: string;
    Price: Number;
    Date: Date;
}