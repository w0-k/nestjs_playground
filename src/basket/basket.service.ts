import { Inject, Injectable } from '@nestjs/common';
import { ShopService } from '../shop/shop.service';
import { BasketItem } from '../interfaces/basket';
import { Response } from '../interfaces/responses';

// TODO: use database for stroing items added to basket
//       connect user with basket

@Injectable()
export class BasketService {
    basket: BasketItem[]
    constructor(
        @Inject(ShopService) private shopService: ShopService
    ) {
        this.basket = [];
    }

    getBasket(userId: string): BasketItem[] {
        return this.basket;
    }

    getTotalPrice() {
        let totalPrice = 0;

        this.basket.forEach(async (current) => {
            const price = await this.shopService.getPrice(current.name);
            totalPrice += price * current.amount;
        });

        return totalPrice;
    }

    addItemToBasket(item: BasketItem): Response {
        const isValidName = typeof item.name === "string" && item.name.length > 0;
        const isValidAmount = typeof item.amount === "number" && item.amount > 0;

        if (!isValidName || !isValidAmount || !this.shopService.isItemAvailable(item.name)) {
            return { isSuccess: false };
        }

        const index = this.basket.findIndex((basketItem) => basketItem.name === item.name);

        if (index >= 0) {
            this.basket[index].amount = item.amount + this.basket[index].amount;
        } else {
            this.basket.push(item);
        }

        this.shopService.addBoughtCounter(item.id, item.amount);

        return {
            isSuccess: true,
            index: this.basket.length - 1,
        }
    }

    removeItemFromBasket(index: number): Response {
        if (!this.basket[index]) {
            return { isSuccess: false };
        }

        this.basket.splice(index, 1);

        return { isSuccess: true };
    }
}
