
type ApiResponse<T =void,> = {
    
    data?: any;
    message?: string;
    errors?: string | string[];
    status: number;
}

export interface IApiResponseFormatter {
    success<T,>(data: T, message: string, status:number): ApiResponse<T>;
    error(errors: string | string[], status:number): ApiResponse;
}
