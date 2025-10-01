import { Module } from "@nestjs/common";
import { GeneratorIdService } from "./generator-id.service";

@Module({
    providers: [GeneratorIdService],
    exports: [GeneratorIdService]
})
export class GeneratorIdModule {}