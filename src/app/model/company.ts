import { Entity } from 'app/model/entity';
import { CompanyType } from './CompanyType';
import { Package } from './package';
import { Pet } from './pet';
import { Tag } from './tag';

export interface Company extends Entity {
    Id_creator_user : string;
    Name: string;
    Description: string;
    DateIgnauration: string;
    AsociationType: CompanyType;
    Logo: string;
    Date: Date;
    Users: string[];
    tags: Tag[];
    Package: Package;
}