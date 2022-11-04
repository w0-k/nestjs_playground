import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { BasketService } from "./basket.service";
import { Basket } from './basket.entity';
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
    ): Promise<Basket> {
        return await this.basketService.getBasket(userId);
    }

    @Post("/:userId")
    addToBasket(
        @Param("userId") userId: string,
        @Body() newItem: NewItem,
    ): Promise<Response> {
        return this.basketService.addItemToBasket(userId, newItem);
    }

    @Delete("/:userId")
    removeFromBasket(
        @Param("userId") userId: string,
        @Query("itemName") itemName: string
    ) {
        return this.basketService.removeItemFromBasket(userId, itemName);
    }
}
