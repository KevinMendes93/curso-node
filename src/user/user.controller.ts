import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";

@Controller('users')
export class UserController {

    @Post()
    async create(@Body() body) {
        return {body};
    }

    @Get()
    async findAll() {
        return {users: []};
    }

    @Get(':id')
    async findById(@Param() param) {
        return {user: {}, param};
    }

    @Put(':id')
    async update(@Param() param, @Body() body) {
        return {
            'method': 'PUT',
            body,
            param
        };
    }

    @Patch(':id')
    async updatePartial(@Param() param, @Body() body) {
        return {
            'method': 'PATCH',
            body,
            param
        };
    }

    @Delete(':id')
    async delete(@Param() param) {
        return {
            'method': 'DELETE',
            param
        };;
    }
}