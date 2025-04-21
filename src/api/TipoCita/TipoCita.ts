import { ApiResponseModel } from "../../types/ApiResponseModel";
import { TipoCita } from "../../types/TipoCita";
import { api } from "../instance";


export async function GetTipoCitas(token: string): Promise<ApiResponseModel<TipoCita[]>> {
    try {
        const response = await api.get<TipoCita[]>('/tipo-cita', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return {
            response: response.data
        }
    } catch (error) {
        console.log(error);
        return {
            response: [],
            error: 'Ocurrio un error al consultar los datos'
        }
    }
}