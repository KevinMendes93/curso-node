import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';
import { UserEntity } from "src/user/entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {

    private readonly ISSUER = 'login';
    private readonly AUDIENCE = 'users';

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,

        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    private generateToken(user: UserEntity) {
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
        
        const user = await this.userRepository.findOneBy({
            email: body.email
        });

        if (!user) throw new UnauthorizedException('E-mail e/ou senha incorretos.');

        bcrypt.compare(body.password, user.password).then(bateu => {
            if (!bateu) throw new UnauthorizedException('E-mail e/ou senha incorretos.');
        })

        return this.generateToken(user);
    }

    async register(body: AuthRegisterDTO) {

        const user = await this.userService.create(body);

        return this.generateToken(user);
    }

    async forget(body: AuthForgetDTO) {
                
        const user = await this.userRepository.findOneBy({
            email: body.email
        });

        if (!user) throw new UnauthorizedException('E-mail está incorreto.');

        //TO DO: enviar email com token de reset.

        return user;
    }
    
    async reset(password: string, token: string) {
        
        try {
            const data:any = this.jwtService.verify(token, {
                issuer: this.ISSUER,
                audience: this.AUDIENCE,
            });

            if (isNaN(Number(data.id))) {
                throw new BadRequestException('Token inválido para o usuário informado.');
            }

            const salt = await bcrypt.genSalt();
            password = await bcrypt.hash(password, salt);
            
            await this.userRepository.update(Number(data.id), {
                password: password
            })

            const user = await this.userService.findById(Number(data.id));

            return this.generateToken(user);

        } catch(err) {
            throw new BadRequestException('Token inválido ou expirado.');
        }

    }
}