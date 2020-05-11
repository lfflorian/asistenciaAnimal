import { Entity } from 'app/model/entity';

export interface Pet extends Entity {
    Uid: string;
    Name: string;
    Age: number;
    Race: string;
    Height: number;
    Weight: number;
    Color: string;
    Date: string;
    Images: string[]
}