import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserPutDTO } from "./dto/update-put-user.dto";
import { UpdateUserPatchDTO } from "./dto/update-patch-user.dto";

@Controller('users')
export class UserController {

    @Post()
    async create(@Body() body: CreateUserDTO) {
        return {body};
    }

    @Get()
    async findAll() {
        return {users: []};
    }

    @Get(':id')
    async findById(@Param('id', ParseIntPipe) id: number) {
        return {user: {}, id};
    }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number, 
        @Body() {name, password} : UpdateUserPutDTO
    ) {
        return {
            'method': 'PUT',
            name, password,
            id
        };
    }

    @Patch(':id')
    async updatePartial(
        @Param('id', ParseIntPipe) id: number, 
        @Body() {name, password}: UpdateUserPatchDTO
    ) {
        return {
            'method': 'PATCH',
            name, password,
            id
        };
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return {
            'method': 'DELETE',
            id
        };;
    }
}