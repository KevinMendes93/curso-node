import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserPutDTO } from "./dto/update-put-user.dto";
import { UpdateUserPatchDTO } from "./dto/update-patch-user.dto";
import * as bcrypt from 'bcrypt';
import { UserEntity } from "./entity/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    async create(user: CreateUserDTO) {
        
        if (this.userRepository.existsBy({ email: user.email })) throw new BadRequestException(`O E-mail ${user.email} já existe`);

        await bcrypt.hash(user.password, await bcrypt.genSalt()).then(hash => {
            user.password = hash;
        });

        const userCreated = this.userRepository.create(user);

        return this.userRepository.save(userCreated);
    }

    async findAll() {
        return this.userRepository.find();
    }

    async findById(id: number) {
        
        await this.verifyUserExists(id);

        return this.userRepository.findOneBy({id});
    }

    async update(user: UpdateUserPutDTO, id: number) {

        await this.verifyUserExists(id);

        await bcrypt.hash(user.password, await bcrypt.genSalt()).then(hash => {
            user.password = hash;
        });

        await this.userRepository.update(id, user);

        return this.verifyUserExists(id);
    }

    async updatePartial(user: UpdateUserPatchDTO, id: number) {

        await this.verifyUserExists(id);

        await bcrypt.hash(user.password, await bcrypt.genSalt()).then(hash => {
            user.password = hash;
        });

        return this.userRepository.update(id, user);
    }

    async delete(id: number) {
        
        await this.verifyUserExists(id);

        return this.userRepository.delete(id);
    }

    private async verifyUserExists(id: number) {
        if (!(await this.userRepository.existsBy({
            id
        }))) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
    }
}