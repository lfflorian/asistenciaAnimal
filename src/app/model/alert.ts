import { Entity } from 'app/model/entity';

export interface Alert extends Entity {
    Uid: string,
    Title : string
    Content : string
    IdAuthor : string
    Date : Date
    Images : string[]
}