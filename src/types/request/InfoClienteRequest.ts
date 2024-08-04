export interface TarjetasRequest { 
    IdCliente: number;
}

export interface TransaccionesRequest {
    numeroTarjeta: string;
    fchInicio: string;
    fchFin: string;
}

export interface AddTransaccionrequest {
    numeroTarjeta: string;
    descripcion: string;
    monto: number;
    tipoTransaccion: string;
    categoria: string;
}