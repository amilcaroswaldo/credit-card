import { EstadoCuentaRespons } from "@/types/response/EstadoCuentaResponse";
import apiBase from "./BaseApiService";
import { ListResponse, ObjectResponse } from "@/types/response/BaseResponse";
import { NumeroTarjetaRequest } from "@/types/request/EstadoCuentaRequest";

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