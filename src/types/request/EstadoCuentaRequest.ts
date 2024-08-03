export interface AddlogsInDBRequest { 
    errorMessage?: string;
    errorNumber?: number;
    originatingComponent?: string;
    additionalInfo?: string;
}
export interface AddTransaccionRequest { 
    numeroTarjeta?: string;
    descripcion?: string;
    monto?: number;
    tipoTransaccion?: string;
    categoria?: string;
}
export interface AddpagoRequest { 
    numeroTarjeta?: string;
    monto?: number;
}