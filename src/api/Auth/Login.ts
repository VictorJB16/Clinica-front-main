import { UserSession } from '../../store/UseUserSession';
import { ApiResponseModel } from '../../types/ApiResponseModel';
import { RegisterUserCredentials } from '../../types/RegisterUserCredentials';
import { LoginUserCredentials } from '../../types/UserCredentials';
import { UserLoginResponse } from '../../types/UserLoginResponse';
import { api } from '../instance';

export const login = async (credentials: LoginUserCredentials): Promise<ApiResponseModel<UserLoginResponse>> => {
  try {
    const response = await api.post<UserLoginResponse>('account/login', credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return {
      response: response.data
    };
  } catch (error: any) {
    return {
      response: {
        token: "",
        expiracion: ""
      },
      error: error.response?.data.message,
    }
  }
}

export const register = async (credentials: RegisterUserCredentials): Promise<ApiResponseModel<UserLoginResponse>> => {

  try {
    const response = await api.post<UserLoginResponse>('account/register', credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return {
      response: response.data
    };

  } catch (error: any) {
    return {
      response: {
        token: "",
        expiracion: ""
      },
      error: error.response?.data.message,
    }
  }

} 