import { Entity } from 'app/model/entity';
import { Like } from './like';


export interface Commentary extends Entity {
    Content : string;
    Date : Date
    IdAuthor : string;
    Likes : Like[] 
}