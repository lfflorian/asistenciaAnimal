import { Entity } from 'app/model/entity';

export interface GeneralConsultation extends Entity {
    id: string;
    Title: string;
    Message: string;
    IdAuthor : string
    Date : Date
}