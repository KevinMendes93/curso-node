import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { AuthService } from "src/auth/auth.service";

export class CkeckTokenMiddleware implements NestMiddleware{
    constructor(private readonly authService: AuthService) {}

    use(req: Request, res: Response, next: NextFunction) {
        
        console.log('Verificando token...' + req.headers['access_token'].toString());

        const token = req.headers['access_token'].toString();
        
        if(!token){
            throw new BadRequestException('Token não fornecido');
        }

        this.authService.verifyToken(token);

        console.log('Middleware de checagem de token executado');

        next();
    }
    
}