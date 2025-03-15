// Type definition for API response
type ApiResponse<T = void> = {
    data?: any;
    message?: string;
    errors?: string | string[];
    status: number;
}

// Interface for API response formatter
export interface IApiResponseFormatter {
    success<T>(data: T, message: string, status: number): ApiResponse<T>;
    error(errors: string | string[], status: number): ApiResponse;
}
