import { Inject, Injectable } from '@nestjs/common';
import { ShopService } from '../shop/shop.service';
import { BasketItem } from '../interfaces/basket';
import { Response } from '../interfaces/responses';
import { Basket } from './basket.entity';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { ShopItem } from 'src/shop/shop-item.entity';

@Injectable()
export class BasketService {
    constructor(
        @Inject(ShopService) private shopService: ShopService,
        @Inject(UserService) private userService: UserService
    ) {}

    async getBasket(userId: string): Promise<ShopItem[]> {
        // const user = await User.findOneBy({ id: userId });
        const user = await User.findOneOrFail(
            { 
                where: { id: userId },
                relations: ["basket"]
            }
        );
        const basketId = user.basket.id;
        const basket = await Basket.findOneByOrFail({ id: basketId });
        debugger;
        return basket.items;
    }

    async getTotalPrice(): Promise<number> {
        let totalPrice = 0;

        [].forEach(async (current) => {
            const price = await this.shopService.getPrice(current.name);
            totalPrice += price * current.amount;
        });

        return totalPrice;
    }

    private getFailureMessage = (msg: string) => ({
        isSuccess: false,
        msg,
    });

    async addItemToBasket(userId: string, newItem: BasketItem): Promise<Response> {
        const shopItem = await this.shopService.getItemByName(newItem.name);
        if (!shopItem) {
            return this.getFailureMessage("Item not available in the shop.");
        }

        const user = await this.userService.getUser(userId);
        if (!user) {
            return this.getFailureMessage("User doesn't exist.");
        }

        const basket = await Basket.findOneByOrFail({
            id: user.basket.id
        });

        if (basket.items.find(item => item.name === newItem.name)) {
            return this.getFailureMessage("Item already in the basket");
        }

        basket.items = [
            ...basket.items,
            shopItem
        ];

        await basket.save();

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
