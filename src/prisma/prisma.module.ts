import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { GeneratorIdModule } from "src/generator-id/generator-id.module";

@Module({
    providers: [PrismaService],
    imports: [GeneratorIdModule],
    exports: [PrismaService, GeneratorIdModule]
})
export class PrismaModule {}