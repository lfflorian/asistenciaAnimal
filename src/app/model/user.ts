import { Entity } from 'app/model/entity';

export interface User extends Entity {
    Uid : string;
    Id_company : string;
    Rol : string;
    Email: string;
    FullName: string;
    FullLastName: string;
    Birthday: Date;
    Date: Date;
    ProfileImage: string;
    Company: boolean;
    Phone: string;
}