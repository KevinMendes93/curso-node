import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { GeneratorIdModule } from "src/generator-id/generator-id.module";

@Module({
    imports: [PrismaModule, GeneratorIdModule],
    providers: [UserService],
    controllers: [UserController],
    exports: []
})
export class UserModule {}