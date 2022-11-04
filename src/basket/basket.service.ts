import { Inject, Injectable } from '@nestjs/common';
import { ShopService } from '../shop/shop.service';
import { Response, StatsResponse } from '../interfaces/responses';
import { Basket } from './basket.entity';
import { UserService } from 'src/user/user.service';
import { BasketItem } from './basket-item.entity';
import { NewBasketItem } from 'src/interfaces/basket';

@Injectable()
export class BasketService {
    constructor(
        @Inject(ShopService) private shopService: ShopService,
        @Inject(UserService) private userService: UserService,
    ) {}

    private async getBasketById(id: string) {
        return await Basket.findOneOrFail({
            relations: ["items"],
            where: { id },
        });
    }

    private isItemInBasket = (basket: Basket, itemName: string) => basket.items.find(i => i.name === itemName);

    async getBasket(userId: string): Promise<Basket> {
        const user = await this.userService.getUser(userId);
        return await this.getBasketById(user.basket.id);
    }

    async addItemToBasket(userId: string, newItem: NewBasketItem): Promise<Response> {
        try {
            const shopItem = await this.shopService.getItemByName(newItem.name);    
            const basket = await this.getBasket(userId);
    
            if (this.isItemInBasket(basket, newItem.name)) {
                throw new Error("Item already in the basket");
            }
            
            const newBasketItem = new BasketItem();
            newBasketItem.name = shopItem.name;
            await newBasketItem.save();

            basket.items = [
                ...basket.items,
                newBasketItem
            ];
    
            await basket.save();

            return {
                isSuccess: true,
                msg: "Item added to basket."
            }
        } catch(e) {
            return {
                isSuccess: false,
                msg: e.message
            }
        }
    }

    async removeItemFromBasket(userId: string, itemName: string): Promise<Response> {
        try {
            const basket = await this.getBasket(userId);

            if (!this.isItemInBasket(basket, itemName)) {
                throw new Error("Item not present in the basket.");
            }

            basket.items = basket.items.filter(item => item.name !== itemName);

            await basket.save();
        } catch(e) {
            return {
                isSuccess: false,
                msg: e.message
            }
        }

        return { 
            isSuccess: true,
            msg: "Item removed from the basket.",
        };
    }

    async getStats(): Promise<StatsResponse> {
        // TODO
        return {
            avgItemInBasketCost: 0,
            avgBasketValue: 0,
        }
    }
}
