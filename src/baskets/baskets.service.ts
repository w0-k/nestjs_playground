import { Injectable } from '@nestjs/common';
import { Basket } from 'src/basket/basket.entity';
import { ShopItem } from 'src/shop/shop-item.entity';
import { StatsResponse } from "../interfaces/responses";

@Injectable()
export class BasketsService {
    async getBaskets() {
        return  await Basket.find({
            relations: ["items"]
        });
    }

    async getStats(): Promise<StatsResponse> {
        const baskets = await Basket.find({
            relations: ["items"]
        });
        const shopItems = await ShopItem.find();
        debugger;

        return {
            avgItemInBasketCost: 0,
            avgBasketValue: 0,
        }
    }
}
