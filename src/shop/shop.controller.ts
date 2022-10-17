import { Controller, Delete, Get, Param, Post, Body } from '@nestjs/common';
import { ShopService } from "./shop.service";

import { 
    GetListOfProductsResponse,
    GetOneProductResponse,
    CreateProductResponse,
    GetPaginatedListOfProductsResponse,
} from "../interfaces/shop";
import { NewShopItem } from 'src/dto/new-shop-item.dto';

@Controller('/shop')
export class ShopController {
    constructor(
        private readonly shopService: ShopService
    ) {}
    
    @Get("/find/:searchTerm")
    async findItem(
        @Param("searchTerm") searchTerm: string
    ): Promise<GetListOfProductsResponse> {
        return this.shopService.findProducts(searchTerm);
    }
    
    @Get("/:pageNumber")
    async getCartItems(
        @Param("pageNumber") pageNumber: string,
    ): Promise<GetPaginatedListOfProductsResponse> {
        return await this.shopService.getItems(Number(pageNumber));
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
