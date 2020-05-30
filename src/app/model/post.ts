import { Entity } from 'app/model/entity';
import { Like } from './like';
import { Commentary } from './Commentary';
import { Tag } from './tag';

export interface Post extends Entity {
    Uid: string
    Title : string
    Content : string
    IdAuthor : string
    Date : Date
    Type : string
    Images : string[]
    Comments : Commentary[]
    Likes : Like[]
    Tags : Tag[]
}