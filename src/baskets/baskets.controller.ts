import { Controller, Get } from '@nestjs/common';
import { Basket } from 'src/basket/basket.entity';
import { BasketsService } from './baskets.service';

@Controller('/baskets')
export class BasketsController {
    constructor(
        private readonly basketsService: BasketsService
    ) {}
    
    @Get()
    async getBaskets(): Promise<Basket[]> {
        return this.basketsService.getBaskets();
    }
}
