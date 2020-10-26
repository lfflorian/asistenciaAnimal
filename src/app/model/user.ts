import { Entity } from 'app/model/entity';

export interface User extends Entity {
    Id_company : string;
    FullDataEntry : boolean;
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