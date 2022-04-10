
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export type BuildPathParamOption = {
    key: string;
    value: string;
};

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
            if (axios.isAxiosError(error)) {
                throw new Error(error?.response?.data?.message);
            }
            throw error;
        }
    }

    public static buildUrlWithPathParams(path: string, options: BuildPathParamOption[]): string {
        if (options.length === 0 ) return path;
        return options.reduce((acc, option) => {
            return `${acc}`.replace(`:${option.key}`, option.value);
        }, path);
    }

    public static isAxiosError(error: any): error is AxiosError {
        return axios.isAxiosError(error);
    }
}
