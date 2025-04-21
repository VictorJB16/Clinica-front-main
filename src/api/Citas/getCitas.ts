import { ApiResponseModel } from "../../types/ApiResponseModel";
import { Cita } from "../../types/Cita";
import { api } from "../instance";


export async function getCitas(token: string): Promise<ApiResponseModel<Cita[]>> {
    try {
        const response = await api.get<Cita[]>("/citas/user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return {
            response: response.data
        };
    } catch (error: any) {
        return {
            error: error.response?.data.message,
            response: []
        }
    }

}

export async function getCitasAdmin(token: string): Promise<ApiResponseModel<Cita[]>> {
    try {
        const response = await api.get<Cita[]>("/citas", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return {
            response: response.data
        };
    } catch (error: any) {
        return {
            error: error.response?.data.message,
            response: []
        }
    }

}