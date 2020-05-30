import { Entity } from 'app/model/entity';
import { Like } from './like';
import { Commentary } from './Commentary';
import { Tag } from './tag';

export interface Post extends Entity {
    Title : string
    Content : string
    IdAuthor : string
    Date : Date
    Type : string
    Comments : Commentary[]
    Likes : Like[]
    Tags : Tag[]
}