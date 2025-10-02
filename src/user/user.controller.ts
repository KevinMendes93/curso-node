import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserPutDTO } from "./dto/update-put-user.dto";
import { UpdateUserPatchDTO } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { ParamId } from "src/decorators/param-id.decorator";

@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    @Post()
    async create(@Body() user: CreateUserDTO) {
        return this.userService.create(user);
    }

    @Get()
    async findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    async findById(@ParamId() id: number) {
        return this.userService.findById(id);
    }

    @Put(':id')
    async update(
        @ParamId() id: number, 
        @Body() user : UpdateUserPutDTO
    ) {
        return this.userService.update(user, id);
    }

    @Patch(':id')
    async updatePartial(
        @ParamId() id: number, 
        @Body() user: UpdateUserPatchDTO
    ) {
        return this.userService.updatePartial(user, id); 
    }

    @Delete(':id')
    async delete(@ParamId() id: number) {
        return this.userService.delete(id);
    }
}