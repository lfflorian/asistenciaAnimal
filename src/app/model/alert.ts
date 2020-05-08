import { Entity } from 'app/model/entity';

export interface Alert extends Entity {
    Title : string
    Content : string
    IdAuthor : string
    Date : Date
    Images : string[]
}