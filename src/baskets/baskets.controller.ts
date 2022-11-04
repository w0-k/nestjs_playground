import { Controller, Get } from '@nestjs/common';
import { Basket } from 'src/basket/basket.entity';
import { BasketsService } from './baskets.service';
import { StatsResponse } from "../interfaces/responses";

@Controller('/baskets')
export class BasketsController {
    constructor(
        private readonly basketsService: BasketsService
    ) {}
    
    @Get("/")
    async getBaskets(): Promise<Basket[]> {
        return this.basketsService.getBaskets();
    }

    @Get("/stats")
    async stats(): Promise<StatsResponse> {
        return await this.basketsService.getStats();
    }
}
