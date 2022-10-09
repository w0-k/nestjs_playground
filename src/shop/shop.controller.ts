import { Controller, Get } from '@nestjs/common';
import { ShopService } from "./shop.service";

import { ItemInterface } from "../interfaces/shop";

@Controller('/shop')
export class ShopController {
    constructor(
        private readonly shopService: ShopService
    ) {}

    @Get("/")
    getCartItems(): ItemInterface[] {
        return this.shopService.getItems();
    }
}
