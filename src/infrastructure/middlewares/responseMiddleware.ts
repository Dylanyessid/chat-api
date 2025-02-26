import { NextFunction, Request, Response } from "express";

export function responseMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
    const statusCode = err ? err.status || 500 : res.statusCode || 200;
    const message = err ? err.message || 'Internal Server Error' : res.locals.message || 'Success';
    const data = err ? err.data || null : res.locals.data || null;
  
    res.status(statusCode).json({
      status: statusCode,
      message,
      data,
    });
}