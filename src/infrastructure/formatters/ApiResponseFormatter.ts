
import { IApiResponseFormatter } from './IApiResponseFormatter';

export class ApiResponseFormatter implements IApiResponseFormatter{
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