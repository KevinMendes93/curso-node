import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [JwtModule.register({
            secret: 'fP7$dJ8!kL9@gH3#mN5&xZ2^vB6*qR4%sT1',
        }),
        UserModule,
        PrismaModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}