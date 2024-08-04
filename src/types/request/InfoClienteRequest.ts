export interface TarjetasRequest { 
    IdCliente: number;
}

export interface TransaccionesRequest {
    numeroTarjeta: string;
    fchInicio: string;
    fchFin: string;
}