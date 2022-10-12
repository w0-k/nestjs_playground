import { Controller, Delete, Get, Param, Post, Body } from '@nestjs/common';
import { ShopService } from "./shop.service";

import { 
    GetListOfProductsResponse,
    GetOneProductResponse,
    CreateProductResponse,
} from "../interfaces/shop";
import { NewShopItem } from 'src/dto/new-shop-item.dto';

@Controller('/shop')
export class ShopController {
    constructor(
        private readonly shopService: ShopService
    ) {}

    @Get("/")
    async getCartItems(): Promise<GetListOfProductsResponse> {
        return await this.shopService.getItems();
    }

    @Get("/:id")
    async getOneCartItem(
        @Param("id") id: string,
    ): Promise<GetOneProductResponse> {
        return await this.shopService.getItem(id);
    }

    @Post("/")
    async createProduct(
        @Body() newShopItem: NewShopItem
    ): Promise<CreateProductResponse> {
        return this.shopService.createItem(newShopItem);
    }

    @Delete("/:id")
    async deleteCartItem(
        @Param("id") id: string,
    ) {
        return await this.shopService.removeItem(id);
    }
}
