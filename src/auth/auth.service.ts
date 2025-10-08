import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { User } from "generated/prisma";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {

    private readonly ISSUER = 'login';
    private readonly AUDIENCE = 'users';

    constructor(
        private readonly jwtService: JwtService,
        private readonly prismaService: PrismaService,
        private readonly userService: UserService
    ) {}
    
    private generateToken(user: User) {
        return {
            accessToken: this.jwtService.sign({
            id: user.id,
            name: user.name,
            email: user.email,
        },
        { 
            expiresIn: '1d',
            subject: String(user.id),
            issuer: this.ISSUER,
            audience: this.AUDIENCE,
        }
    )}
    }

    verifyToken(token: string) {

        try {
            const data = this.jwtService.verify(token, {
                issuer: this.ISSUER,
                audience: this.AUDIENCE,
            });
            return data;
        } catch(err) {
            throw new BadRequestException(err);
        }
    }

    isValidToken(token: string): boolean {

        try {
            this.verifyToken(token);
            return true;
        } catch(err) {
            false;
        }
    }

    async login(body: AuthLoginDTO) {
        
        const user = await this.prismaService.user.findFirst({
            where: {
                email: {
                    equals: body.email,
                }, 
                password: {
                    equals: body.password,
                } 
            }
        });
        
        if (!user) throw new UnauthorizedException('E-mail e/ou senha incorretos.');

        return this.generateToken(user);
    }

    async register(body: AuthRegisterDTO) {

        const user = await this.userService.create(body);

        return this.generateToken(user);
    }

    async forget(body: AuthForgetDTO) {
                
        const user = await this.prismaService.user.findFirst({
            where: {
                email: {
                    equals: body.email,
                }
            }
        });
        if (!user) throw new UnauthorizedException('E-mail está incorreto.');

        //TO DO: enviar email com token de reset.

        return user;
    }
    
    async reset(body: AuthResetDTO) {
        //TO DO: validar token de reset.

        const id = 0;

        const user = await this.prismaService.user.update({
            where: {
                id,
            },
            data: {
                password: body.password,
            }
        });

        return this.generateToken(user);
    }
}