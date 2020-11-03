import { Entity } from 'app/model/entity';
import { Rol } from './Rol';

export interface User extends Entity {
    Id_company : string;
    FullDataEntry : boolean;
    Rol : Rol;
    Email: string;
    FullName: string;
    FullLastName: string;
    Birthday: Date;
    Date: Date;
    ProfileImage: string;
    Company: boolean;
    Phone: string;
    Pets: string[];
}