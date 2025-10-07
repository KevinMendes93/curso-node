import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { GeneratorIdService } from "src/generator-id/generator-id.service";
import { UpdateUserPutDTO } from "./dto/update-put-user.dto";
import { UpdateUserPatchDTO } from "./dto/update-patch-user.dto";

@Injectable()
export class UserService {

    constructor(private prismaService: PrismaService, private generatorId: GeneratorIdService) {}

    async create(user: CreateUserDTO) {
        
        return this.prismaService.user.create ({
            data: {
                ...user,
                id: this.generatorId.generateUniqueId(),
                birthAt: user.birthAt ? new Date(user.birthAt) : null,
            }
        })
    }

    async findAll() {
        return this.prismaService.user.findMany();
    }

    async findById(id: number) {
        
        await this.verifyUserExists(id);

        return this.prismaService.user.findUnique({where: {id}});
    }

    async update(user: UpdateUserPutDTO, id: number) {

        await this.verifyUserExists(id);

        return this.prismaService.user.update({
            where: {id},
            data: {...user, birthAt: user.birthAt ? new Date(user.birthAt) : null}
        });
    }

    async updatePartial(user: UpdateUserPatchDTO, id: number) {

        await this.verifyUserExists(id);

        return this.prismaService.user.update({
            where: {id},
            data: {...user, birthAt: user.birthAt ? new Date(user.birthAt) : null, updatedAt: new Date(Date.now())}
        });
    }

    async delete(id: number) {
        
        await this.verifyUserExists(id);

        return this.prismaService.user.delete({where: {id}});
    }

    private async verifyUserExists(id: number) {
        if (!(await this.prismaService.user.count({
            where: {id}
        }))) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
    }
}