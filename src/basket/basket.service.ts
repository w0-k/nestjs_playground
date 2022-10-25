import { Inject, Injectable } from '@nestjs/common';
import { ShopService } from '../shop/shop.service';
import { BasketItem } from '../interfaces/basket';
import { Response } from '../interfaces/responses';
import { Basket } from './basket.entity';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

// TODO: use database for stroing items added to basket
//       connect user with basket

@Injectable()
export class BasketService {
    constructor(
        @Inject(ShopService) private shopService: ShopService,
        @Inject(UserService) private userService: UserService
    ) {}

    getBasket(userId: string): BasketItem[] {
        return [];
    }

    getTotalPrice() {
        let totalPrice = 0;

        [].forEach(async (current) => {
            const price = await this.shopService.getPrice(current.name);
            totalPrice += price * current.amount;
        });

        return totalPrice;
    }

    async addItemToBasket(userId: string, newItem: BasketItem): Promise<Response> {
        const isValidName = typeof newItem.name === "string" && newItem.name.length > 0;
        const isValidAmount = typeof newItem.amount === "number" && newItem.amount > 0;

        if (!isValidName || !isValidAmount || !this.shopService.isItemAvailable(newItem.name)) {
            return { isSuccess: false };
        }

        const user = await this.userService.getUser(userId);
        if (!user) {
            return {
                isSuccess: false,
                msg: "User doesn't exist."
            }
        }

        const shopItem = await this.shopService.getItemByName(newItem.name);
        if (!shopItem) {
            return {
                isSuccess: false,
                msg: "Item not available in the shop."
            }
        }

        const basket = await Basket.findOneByOrFail({
            id: user.basket.id
        });

        // check if item not already in the basekt

        // update basket with new item

        this.shopService.addBoughtCounter(newItem.id, newItem.amount);

        return {
            isSuccess: true,
            index: [].length - 1,
        }
    }

    removeItemFromBasket(index: number): Response {
        if (![][index]) {
            return { isSuccess: false };
        }

        [].splice(index, 1);

        return { isSuccess: true };
    }
}
