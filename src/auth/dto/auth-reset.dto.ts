import { IsJWT, IsStrongPassword } from "class-validator";

export class AuthResetDTO {
    
    @IsStrongPassword({
        minLength: 6,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0
    }, {message: 'A senha deve ter no mínimo 6 caracteres.'})
    password: string;

    @IsJWT()
    token: string;
}