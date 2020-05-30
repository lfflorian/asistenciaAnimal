import { Entity } from 'app/model/entity';

export interface CredentialsPayment extends Entity {
    KeySecret : string
    KeyPublic : string
    IdCompany : string
    Date : Date
}