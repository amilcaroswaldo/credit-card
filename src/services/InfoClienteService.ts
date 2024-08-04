import {
  TarjetasRequest,
  TransaccionesRequest,
} from "@/types/request/InfoClienteRequest";
import apiBase from "./BaseApiService";
import { ListResponse, ObjectResponse } from "@/types/response/BaseResponse";
import {
  ClienteResponse,
  TarjetaResponse,
  TransaccionesResponse,
} from "@/types/response/InfoClienteResponse";
const coleccion: string = "InfoCliente";

export const getClients = async (): Promise<ListResponse<ClienteResponse>> => {
  try {
    const response = await apiBase.get<ListResponse<ClienteResponse>>(
      `/${coleccion}/getallclientes`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    const responseErr: ListResponse<ClienteResponse> = {
      code: 0,
      message: `Error: ${error}`,
      items: undefined,
    };
    return responseErr;
  }
};

export const getDataCard = async (
  request: TarjetasRequest
): Promise<ObjectResponse<TarjetaResponse>> => {
  try {
    const response = await apiBase.get<ObjectResponse<TarjetaResponse>>(
      `/${coleccion}/gettarjetabyidcliente?IdCliente=${request.IdCliente}`
    );
    if (response.data.code == 0) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.log(error);
    const responseErr: ObjectResponse<TarjetaResponse> = {
      code: 0,
      message: `Error: ${error}`,
      items: undefined,
    };
    return responseErr;
  }
};

export const GetTransaccionRangeDate = async (
  request: TransaccionesRequest
): Promise<ListResponse<TransaccionesResponse>> => {
  try {
    const response = await apiBase.get<ListResponse<TransaccionesResponse>>(
      `/${coleccion}/gettransaccionesbyrangedate?NumeroTarjeta=${request.numeroTarjeta}&FchInicio=${request.fchInicio}&FchFin=${request.fchFin}`
    );
    if (response.data.code == 0) {
      throw new Error(response.data.message);
    }
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.log(error);
    const responseErr: ListResponse<TransaccionesResponse> = {
      code: 0,
      message: `Error: ${error}`,
      items: undefined,
    };
    return responseErr;
  }
};
