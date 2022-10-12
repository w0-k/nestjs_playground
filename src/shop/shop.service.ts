import { Injectable } from '@nestjs/common';
import { NewShopItem } from 'src/dto/new-shop-item.dto';
import { DeleteResult } from 'typeorm';

import { ItemInterface } from "../interfaces/shop";
import { ShopItem } from './shop-item.entity';

@Injectable()
export class ShopService {
    async getItems(): Promise<ItemInterface[]> {
        return await ShopItem.find();
    }

    async getItem(id: string): Promise<ShopItem> {
        return await ShopItem.findOneByOrFail({ id });
    }

    async createItem(newShopItem: NewShopItem): Promise<ShopItem> {
        const item = new ShopItem();
        item.name = newShopItem.name;
        item.description = newShopItem.description;
        item.price = newShopItem.price;

        return await item.save();
    }

    async removeItem(id: string): Promise<DeleteResult> {
        return await ShopItem.delete(id);
    }

    async addBoughtCounter(id: string, amount: number) {
        await ShopItem.update(id, { wasEverBought: true });
        const item = await ShopItem.findOneByOrFail({ id });
        item.boughtCounter += amount;
        await item.save();
    }

    async getPrice(name: string): Promise<number> {
        const items = await this.getItems();
        return items.find(item => item.name === name).price;
    } 

    async isItemAvailable(itemName: string): Promise<boolean> {
        const items = await this.getItems();
        return Boolean(items.find(item => item.name === itemName));
    }
}
