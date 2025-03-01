import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToClass, plainToInstance } from 'class-transformer';

import { IApiResponseFormatter } from '../formatters/IApiResponseFormatter';

export function validateDTO(dtoClass: any, formatter:IApiResponseFormatter) {
    return (req: Request, res: Response, next: NextFunction) => {
        const dtoInstance = plainToInstance(dtoClass, req.body);
        validate(dtoInstance).then((errors: ValidationError[]) => {
            if (errors.length > 0) {
                const errorMessages = errors.map(error => Object.values(error.constraints || {})).flat();
                const response = formatter.error(errorMessages, 404)
                res.status(400).json(response);
            } else {
                next();
            }
        });
    };
}