import { ApiResponseModel } from "../../types/ApiResponseModel";
import { CreateCita } from "../../types/CreateCita";
import { api } from "../instance";


export async function AddCita(token: string, createCita: CreateCita): Promise<ApiResponseModel<string>> {
    try {
        await api.post("/citas", createCita, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return {
            response: "OK"
        };
    } catch (error: any) {
        return {
            error: error.response?.data.message,
            response: 'FAIL'
        }
    }

}