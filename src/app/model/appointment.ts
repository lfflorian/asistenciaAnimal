import { Entity } from 'app/model/entity';

export interface Appointment extends Entity {
    id?: string;
    IdAuthor? : string;
    IdUser? : string;
    Date? : Date;
    DateInit? : Date;
    DateFinal? : Date;
    Status? : Boolean;
}