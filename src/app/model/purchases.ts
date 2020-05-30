import { Entity } from 'app/model/entity';

export interface Purchases extends Entity {
    ProducDetail : ProductDetail;
    ClientDetail : ClientDetail;
    Date : Date
    IdUser : string;
    IdPackage : string;
}

export interface ClientDetail extends Entity {
    FirstName : string
    LastName : string
    Street1 : string
    Country : string
    City : string
    State : string
    PostCode : string
    Email : string
    IpAddress : string
    Phone : string
    Total : string
    Fecha_Transaccion : string
    DeviceFingerPrintID : string
}

export interface ProductDetail extends Entity {
    Id_Producto : string
    Nombre : string
    Precio : string
    Cantidad : string
    Tipo : string
    Subtotal : string
}

