import { ApiResponseModel } from "../../types/ApiResponseModel";
import { api } from "../instance";


export async function DeleteCita(token: string, id: number): Promise<ApiResponseModel<string>> {
    try {
        await api.delete(`/citas/${id}`, {
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