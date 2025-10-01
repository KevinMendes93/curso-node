import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserPutDTO } from "./dto/update-put-user.dto";
import { UpdateUserPatchDTO } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";

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
    async findById(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findById(id);
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number, 
        @Body() user : UpdateUserPutDTO
    ) {
        return this.userService.update(user, id);
    }

    @Patch(':id')
    async updatePartial(
        @Param('id', ParseIntPipe) id: number, 
        @Body() user: UpdateUserPatchDTO
    ) {
        return this.userService.updatePartial(user, id); 
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id);
    }
}