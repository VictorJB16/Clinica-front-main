import { ApiResponseModel } from "../../types/ApiResponseModel";
import { Paciente } from "../../types/paciente";
import { api } from "../instance";


export async function getPacientes(token: string): Promise<ApiResponseModel<Paciente[]>> {
    try {
        const response = await api.get<Paciente[]>("/pacientes", {
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