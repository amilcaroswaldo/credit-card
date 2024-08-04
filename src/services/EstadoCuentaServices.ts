import { EstadoCuentaRespons } from "@/types/response/EstadoCuentaResponse";
import apiBase from "./BaseApiService";
import { GenericResponse, ListResponse, ObjectResponse } from "@/types/response/BaseResponse";
import { AddpagoRequest, AddTransaccionRequest, NumeroTarjetaRequest } from "@/types/request/EstadoCuentaRequest";

const coleccion: string = "estadocuenta";


export const GetEstadoCuenta = async (request: NumeroTarjetaRequest): Promise<ObjectResponse<EstadoCuentaRespons>> => {
    try {
      const response = await apiBase.get<ObjectResponse<EstadoCuentaRespons>>(
        `/${coleccion}/getestadocuenta?Numero_Tarjeta=${request.numeroTarjeta}`
      );
      if (response.data.code == 0) {
        throw new Error(response.data.message);
      }
      return response.data;
    } catch (error) {      
      const responseErr: ObjectResponse<EstadoCuentaRespons> = {
        code: 0,
        message: `Error: ${error}`,
        items: undefined,
      };
      return responseErr;
    }
  };

  export const AddTransaction = async (
    request: AddTransaccionRequest
  ): Promise<GenericResponse> => {
    try {
      const response = await apiBase.post<GenericResponse>(
        `/${coleccion}/addtransaccion`,
        request
      );
      if (response.data.code == 0) {
        throw new Error(response.data.message);
      }
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      console.log(error);
      const responseErr: GenericResponse = {
        code: 0,
        message: `Error: ${error}`
      };
      return responseErr;
    }
  };  

  export const AddPago = async (
    request: AddpagoRequest
  ): Promise<GenericResponse> => {
    try {
      const response = await apiBase.post<GenericResponse>(
        `/${coleccion}/addpago`,
        request
      );
      if (response.data.code == 0) {
        throw new Error(response.data.message);
      }
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      console.log(error);
      const responseErr: GenericResponse = {
        code: 0,
        message: `Error: ${error}`
      };
      return responseErr;
    }
  };  