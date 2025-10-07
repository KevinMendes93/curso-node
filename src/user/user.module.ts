import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { GeneratorIdModule } from "src/generator-id/generator-id.module";
import { UserIdCheckMiddleware } from "src/middlewares/user-id-check.middleware";
import { CkeckTokenMiddleware } from "src/middlewares/check-token.middleware";

@Module({
    imports: [PrismaModule, GeneratorIdModule],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService],
})
export class UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserIdCheckMiddleware).forRoutes({
            path: 'users/:id',
            method: RequestMethod.ALL
        });
        consumer.apply(CkeckTokenMiddleware).forRoutes({
            path: 'users',
            method: RequestMethod.GET
        });
    }
}