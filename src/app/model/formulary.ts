import { Entity } from 'app/model/entity';

export interface Formulary extends Entity {
    Type: string;
    IdAuthor: string;
    IdConfiguration: string;
    Date: Date;
    IdUser: string;
    IdPet: string;
}

export interface ConfigForm extends Entity {
    Type: string;
    IdAuthor: string;
    Configuration: string;
    Date: Date;
}