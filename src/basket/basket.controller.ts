import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { BasketService } from "./basket.service";
import { Basket } from './basket.entity';
import { NewBasketItem } from 'src/interfaces/basket';
import { Response } from "../interfaces/responses";
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from 'src/decorators/user-object.decorator';
import { User } from 'src/user/user.entity';

@Controller("/basket")
export class BasketController {
    constructor(
        private readonly basketService: BasketService
    ) {}

    @Get("/")
    @UseGuards(AuthGuard("jwt"))
    async getBasket(
        @UserObj() user: User,
    ): Promise<Basket> {
        return await this.basketService.getBasket(user.id);
    }

    @Post("/")
    @UseGuards(AuthGuard("jwt"))
    addToBasket(
        @Body() newItem: NewBasketItem,
        @UserObj() user: User,
    ): Promise<Response> {
        return this.basketService.addItemToBasket(user.id, newItem);
    }

    @Delete("/")
    @UseGuards(AuthGuard("jwt"))
    removeFromBasket(
        @Query("itemName") itemName: string,
        @UserObj() user: User,
    ) {
        return this.basketService.removeItemFromBasket(user.id, itemName);
    }
}
