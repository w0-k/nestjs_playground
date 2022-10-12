import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { BasketService } from "./basket.service";
import { BasketItem } from "../interfaces/basket";
import { NewItem } from '../dto/new-item.dto';
import { Response } from "../interfaces/responses";

@Controller("/basket")
export class BasketController {
    constructor(
        private readonly basketService: BasketService
    ) {}

    @Get("/")
    getBasket(): BasketItem[] {
        return this.basketService.getBasket();
    }

    @Get("/total-price")
    async getTotalPrice(): Promise<number> {
        return await this.basketService.getTotalPrice();
    }

    @Post("/")
    addToBasket(
        @Body() newItem: NewItem
    ): Response {
        return this.basketService.addItemToBasket(newItem);
    }

    @Delete("/:index")
    removeFromBasket(
        @Param("index") index: number,
    ) {
        return this.basketService.removeItemFromBasket(index);
    }
}
