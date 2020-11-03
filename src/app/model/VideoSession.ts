import { Entity } from 'app/model/entity';

export interface VideoSession extends Entity {
    IdUserCreator: string;
    Date : Date;
    IdCall: string;
    status? : boolean;
}