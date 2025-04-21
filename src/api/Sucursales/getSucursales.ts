import { ApiResponseModel } from "../../types/ApiResponseModel";
import { Sucursal } from "../../types/Surcursal";
import { api } from "../instance";

export async function GetSucursales(token: string): Promise<ApiResponseModel<Sucursal[]>> {
    try {
        const response = await api.get<Sucursal[]>("/sucursales", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return {
            response: response.data,
        }
    } catch (error) {
        console.log(error);
        return {
            response: [],
            error: "Hubo un error al consultar la data"
        };
    }
}