export interface ClienteResponse { 
    clienteId?: string;
    nombre?: string;
    numeroIdentidad?: string;
    direccion?: string;
    telefono?: string;
    email?: string;
}
export interface TarjetaResponse { 
    numeroTarjeta?: string;
    clienteId?: number;
    limiteCredito?: number;
    saldoActual?: number;
    saldoDisp?: number;
    fchApertura?: string;
    fchaVenc?: string;
    fchCorteIni?: string;
    fchCorteFin?: string;
    descBeneficios?: string;
}
export interface TransaccionesResponse { 
    numeroTarjeta?: string;
    montoTransaccion?: number;
    fchaTransaccion?: string;
    descripcion?: string;
    tipoTransaccion?: string;
    categoria?: string;
}
export interface AllpagosResponse { 
    numeroTarjeta?: string;
    montoPago?: number;
    montoDisp?: number;
    montoPagado?: number;
    montoMora?: number;
    fchaPago?: string;
    fchCorteIniP?: string;
    fchCorteFinP?: string;
}