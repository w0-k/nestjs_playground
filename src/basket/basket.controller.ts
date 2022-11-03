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

    @Get("/:userId")
    async getBasket(
        @Param("userId") userId: string,
    ): Promise<BasketItem[]> {
        debugger;
        return await this.basketService.getBasket(userId);
    }

    @Get("/total-price")
    async getTotalPrice(): Promise<number> {
        return await this.basketService.getTotalPrice();
    }

    @Post("/:userId")
    addToBasket(
        @Param("userId") userId: string,
        @Body() newItem: NewItem,
    ): Promise<Response> {
        return this.basketService.addItemToBasket(userId, newItem);
    }

    @Delete("/:index")
    removeFromBasket(
        @Param("index") index: number,
    ) {
        return this.basketService.removeItemFromBasket(index);
    }
}
