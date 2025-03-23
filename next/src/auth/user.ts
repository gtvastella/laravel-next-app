import api, { BaseResponse } from '../utils/api';

export interface LoginResponse extends BaseResponse {
    success: boolean;
    data: {
        token: string;
        userId: number;
    };
    message: string;
}

export interface RegisterResponse extends BaseResponse {
    data: {
        userId: number;
    };
}

async function register(name: string, email: string, password: string, passwordConfirmation: string): Promise<RegisterResponse> {
    const fakeRegisterResponse: RegisterResponse = {
        success: false,
        data: {
            userId: 0
        },
        message: 'Erro ao se conectar ao servidor',
    };

    try {
        const params = {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation
        };
        console.log(params);
        const response = await api.post('/register', params);
        return response.data as RegisterResponse;
    } catch (error: any) {
        if (!error.response) {
            return fakeRegisterResponse;
        }
        return error.response?.data as RegisterResponse;
    }
}

async function login(email: string, password: string): Promise<LoginResponse> {
    const fakeLoginResponse: LoginResponse = {
        success: false,
        data: {
            token: '',
            userId: 0
        },
        message: 'Erro ao se conectar ao servidor',
    };

    try {
        const params = { email, password };
        const response = await api.post('/login', params);
        return response.data as LoginResponse;
    } catch (error: any) {
        if (!error.response) {
            return fakeLoginResponse;
        }
        return error.response?.data as LoginResponse;
    }
}

async function logout(): Promise<BaseResponse> {
    const fakeLogoutResponse: BaseResponse = {
        success: false,
        message: 'Erro ao se conectar ao servidor',
        data: [],
    };

    try {
        const response = await api.post('/logout');
        return response.data as BaseResponse;
    } catch (error: any) {
        if (!error.response) {
            return fakeLogoutResponse;
        }
        return error.response?.data as BaseResponse;
    }
}

export { login, logout, register};
