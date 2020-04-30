import { Entity } from 'app/model/entity';

export interface Article extends Entity {
    Title : string
    Content : string
    IdAuthor : string
    Date : Date
}