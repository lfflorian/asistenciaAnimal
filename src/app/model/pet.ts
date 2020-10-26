import { Entity } from 'app/model/entity';

export interface Pet extends Entity {
    IdUser? : string;
    IdCompany? : string;
    Uid?: string;
    Name?: string;
    Age?: number;
    Gender?: string;
    Race?: string;
    Height?: number;
    Weight?: number;
    Color?: string;
    Date?: Date;
    MoreAbout?: string;
    Images?: string[]
    InAdoption? : boolean
    AnimalType? : string
    MedicalHistory? : MedicalHistory[];
}

export interface MedicalHistory extends Entity {
    /*IdPet : string;*/
    IdCompany : string;
    Date : Date;
    Comments : string;
    Prescription : Prescription[];
}

export interface Prescription extends Entity {
    Nombre : string;
    Description : string;
    Frecuency : string;
    InitDate : Date;
    FinalDate : Date;
}

