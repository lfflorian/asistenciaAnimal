import { Entity } from 'app/model/entity';


export interface Rol extends Entity {
    Name: string;
    Access: number;
}