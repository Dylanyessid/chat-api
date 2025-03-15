import { IApiResponseFormatter } from './IApiResponseFormatter';

// Class to format API responses
export class ApiResponseFormatter implements IApiResponseFormatter {
    success<T>(data: T, message: string, status: number) {
        return {
            data,
            message,
            status
        }
    }

    error(errors: string | string[], status: number) {
        return {
            status,
            errors
        }
    }
}