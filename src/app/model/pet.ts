import { Entity } from 'app/model/entity';

export interface Pet extends Entity {
    IdUser : string;
    Uid: string;
    Name: string;
    Age: number;
    Race: string;
    Height: number;
    Weight: number;
    Color: string;
    Date: string;
    Images: string[]
    InAdoption : boolean
}