import { Body, Controller, Delete, Get, Patch, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserPutDTO } from "./dto/update-put-user.dto";
import { UpdateUserPatchDTO } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { ParamId } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";
import { RoleGuard } from "src/guards/role.guard";
import { AuthGuard } from "src/guards/auth.guard";

@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    @Roles([Role.Admin])
    @Post()
    async create(@Body() user: CreateUserDTO) {
        return this.userService.create(user);
    }

    @Roles([Role.Admin, Role.User])
    @Get()
    async findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    async findById(@ParamId() id: number) {
        return this.userService.findById(id);
    }

    @Roles([Role.Admin])
    @Put(':id')
    async update(
        @ParamId() id: number, 
        @Body() user : UpdateUserPutDTO
    ) {
        return this.userService.update(user, id);
    }

    @Roles([Role.Admin])
    @Patch(':id')
    async updatePartial(
        @ParamId() id: number, 
        @Body() user: UpdateUserPatchDTO
    ) {
        return this.userService.updatePartial(user, id); 
    }

    @Roles([Role.Admin])
    @Delete(':id')
    async delete(@ParamId() id: number) {
        return this.userService.delete(id);
    }
}