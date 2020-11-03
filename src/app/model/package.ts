import { Entity } from 'app/model/entity';

export interface Package extends Entity {
    Nombre: string;
    Precio: Number;
    Moneda: string;
    NoMascotas: Number;
}