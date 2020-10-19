import { Entity } from 'app/model/entity';

export interface Pet extends Entity {
    IdUSer : string;
    IdCompany : string;
    Uid: string;
    Name: string;
    Age: number;
    Race: string;
    Height: number;
    Weight: number;
    Color: string;
    Date: string;
    MoreAbout : string;
    Images: string[]
    InAdoption : boolean
    MedicalHistory : MedicalHistory[];
}

export interface MedicalHistory extends Entity {
    IdPet : string;
    IdCompany : string;
    Date : string;
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

