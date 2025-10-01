import { Injectable } from "@nestjs/common";

@Injectable()
export class GeneratorIdService {
    private currentCounter = 0;

    generateUniqueId(): number {
        this.currentCounter ++;

        const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1));

        return randomNumber + this.currentCounter;
    }
}