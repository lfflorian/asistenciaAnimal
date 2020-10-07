import { Entity } from 'app/model/entity';

export interface AdoptionForm extends Entity {
    Estado : string
    NombreAdoptivo : string
    Nombre : string
    Apellido : string
    NoDPI : number
    Email : string
    Telefono : string
    Celular : string
    Direccion : string
    NoPersonasEnCasa : number
    NoPerrosEnCasa : number
    LugarSinEscapar : boolean
    TienePatio : boolean
    TieneJardin : boolean
    TieneSuficienteEspacio : boolean
    AmbienteADormir : string
    DescripcionDelLugarADormir : string
    AceptanMascotas : boolean
    RazonDeAdopcion : string
    CompromisoCuidarlo : boolean
    CompromisoCambioHogar : boolean
    CompromisoGastos : boolean
    CompromisoEnvioFotografias : boolean
    ConcienciaDeRetiro : boolean
    CompromisoPaciencia : boolean
    HorarioDeActividades : string
    PersonaResponsableEnHorasNoHabiles : string
    Facebook : string
    instagram : string
    ImagenesDelLugar : string[]
    PerrosEnCasa : PerrosEnCasa[]
    PrsonasEnCasa : PersonasEnCasa[]
}

export interface PerrosEnCasa {
	Genero : string
	BuenCoportamiento : boolean
	EsEsterilizado : boolean
}

export interface PersonasEnCasa {
    Edad : number
	TienenAlergia : boolean
	Alergia : string
	EstaDeacuerdo : boolean
}