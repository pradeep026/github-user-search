
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class Network {
    private axiosInstance: AxiosInstance | undefined;

    private get instance() {
        if (this.axiosInstance) {
            return this.axiosInstance;
        }
        // initialize the axios instance
        this.axiosInstance = axios.create({
            baseURL: process.env.REACT_APP_GITHUB_HOST,
            timeout: 60000,
        });
        return this.axiosInstance;
    }

    public async makeGetRequest<TRequest, TResponse>(options: AxiosRequestConfig): Promise<TResponse> {
        try {
            const response = await this.instance.request<TRequest, AxiosResponse<TResponse>>({
                method: 'GET',
                ...options,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public static isAxiosError(error: unknown | Error) {
        return axios.isAxiosError(error);
    }
}
