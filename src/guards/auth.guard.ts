import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService, 
        private readonly userService: UserService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = (request.headers['authorization'] ?? '').split(' ')[1];

        try {
            const data = this.authService.verifyToken(token);

            request.tokenPayLoad = data;

            request.user = await this.userService.findById(data.id);
            
            return true;
        } catch (error) {

            return false;
        }
    }
    
}