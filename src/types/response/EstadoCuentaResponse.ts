export interface CoutaMinimaResponse { 
    cuotaMinima?: number;
}
export interface EstadoCuentaRespons { 
    saldoActual?: number;
    saldoDisponible?: number;
    interesBonificable?: number;
    cuotaMinima?: number;
    montoContadoConIntereses?: number;
    montoTotal?: number;
    montoTotalMesActualAnterior?: number;
}
export interface GetConfiguracion { 
    nombre?: string;
    valor?: number;
}
export interface InteresBonificableResponse { 
    interesBonificable?: number;
}
export interface MontoContadoConInteresesResponse { 
    montoContadoConIntereses?: number;
}