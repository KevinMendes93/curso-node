import { IsEmail, IsStrongPassword } from "class-validator";

export class AuthLoginDTO {
    
    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minLowercase: 0,
        minNumbers: 0,
        minSymbols: 0,
        minUppercase: 0,
    }, {message: 'A senha deve ter no mínimo 6 caracteres.'})
    password: string;
}