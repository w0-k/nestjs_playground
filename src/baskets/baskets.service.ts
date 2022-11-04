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
        const basketsItemsMap = baskets.map(({ items }) => items.map(({ name }) => name));
        
        const basketPricesMap = basketsItemsMap.map((basket) => basket.map(
            (name) => shopItems.find((shopItem) => shopItem.name === name).price
        ));

        let basketsTotalValue = 0;
        const sumFn = (a: number, b: number) => a + b;

        const avgPricesMap = basketPricesMap.map((basket) => {
            const sum = basket.reduce(sumFn, 0);
            basketsTotalValue += sum;
            return Number((sum / basket.length).toFixed(2));
        });

        const avgItemCost = avgPricesMap.reduce(sumFn, 0) / avgPricesMap.length;
        const toFixedNum = (value: number) => Number(value.toFixed(2));
        return {
            avgItemInBasketCost: toFixedNum(avgItemCost),
            avgBasketValue: toFixedNum(basketsTotalValue / baskets.length),
        }
    }
}
