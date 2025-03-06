import { NextFunction, Request, Response } from "express";
import { container } from "../di/container";
import { JwtService } from "../security/jwt";
import { AuthRequest } from "../http/httpInterfaces";

const jwtService = container.resolve<JwtService>("JwtService")



export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization"); 
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
       res.status(401).json({ message: "No autorizado: Token requerido" });
       return
    }
  
    const token = authHeader.split(" ")[1]; 
    const decoded = jwtService.verifyToken(token); 
  
    if (!decoded) {
       res.status(401).json({ message: "No autorizado: Token inválido" });
       return
    }
  
    (req as AuthRequest).user = decoded; 
    next(); 
    return
  };