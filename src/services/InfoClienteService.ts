import apiBase from "./BaseApiService";
import { ListResponse } from "@/types/response/BaseResponse";
import { ClienteResponse } from "@/types/response/InfoClienteResponse";
const coleccion: string = "InfoCliente";

export const getClients = async (): Promise<ListResponse<ClienteResponse>> => {
  try {
    const response = await apiBase.get<ListResponse<ClienteResponse>>(
      `/${coleccion}/getallclientes`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    const responseErr : ListResponse<ClienteResponse> = {code:0, message:`Error: ${error}`, items:undefined};
    return responseErr;
  }
};
