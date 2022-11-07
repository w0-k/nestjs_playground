import { Controller, DefaultValuePipe, Get, ImATeapotException, Param, UseGuards } from '@nestjs/common';
import { Basket } from 'src/basket/basket.entity';
import { BasketsService } from './baskets.service';
import { StatsResponse } from "../interfaces/responses";
import { CheckAgePipe } from 'src/pipes/check-age.pipe';
import { PasswordProtectGuard } from 'src/guards/password-protect-guard';
import { UsePassword } from 'src/decorators/use-password.decorator';

@Controller('/baskets')
export class BasketsController {
    constructor(
        private readonly basketsService: BasketsService
    ) {}
    
    @UseGuards(PasswordProtectGuard)
    @UsePassword("admin1234")
    @Get("/")
    async getBaskets(): Promise<Basket[]> {
        return this.basketsService.getBaskets();
    }

    @UseGuards(PasswordProtectGuard)
    @UsePassword("pass")
    @Get("/stats")
    async stats(): Promise<StatsResponse> {
        return await this.basketsService.getStats();
    }

    // @Get("/test/:age?")
    // test(
    //     // @Param("age", new CheckAgePipe({ minAge: 21 })) age?: number,
    //     @Param("age") age: number,
    // ) {
    //     console.log(typeof age);
    //     return "";
    // }

    @Get("/test")
    test() {
        throw new ImATeapotException("shiet!");
        // throw new Error("err");
    }
}
