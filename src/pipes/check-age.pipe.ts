import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

interface CheckAgePipeOptions {
    minAge: number;
}

@Injectable()
export class CheckAgePipe implements PipeTransform {
    constructor(
        private options: CheckAgePipeOptions
    ) {}

    transform(value: any, metadata: ArgumentMetadata) {
        const age = Number(value);

        if (Number.isNaN(age) || age < this.options.minAge) {
            throw new BadRequestException(`Age must be a number and ought to be higher or equal ${this.options.minAge}.`);
        }

        return age;
    }
}