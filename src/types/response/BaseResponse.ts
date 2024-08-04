export interface ObjectResponse<T> { 
    code?: number;
    message?: string;
    items?: T;
}
export interface GenericResponse { 
    code?: number;
    message?: string;
}
export interface ListResponse<T> { 
    code?: number;
    message?: string;
    items?: T[];
}