import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewShopItem } from 'src/dto/new-shop-item.dto';
import { DeleteResult, Repository } from 'typeorm';

import { ItemInterface } from "../interfaces/shop";
import { ShopItem } from './shop-item.entity';

@Injectable()
export class ShopService {
    items: ItemInterface[];

    constructor(
        @InjectRepository(ShopItem) private shopItemRepository : Repository<ShopItem>
    ) {}

    async getItems(): Promise<ItemInterface[]> {
        return await this.shopItemRepository.find();
    }

    async getItem(id: string): Promise<ShopItem> {
        return await this.shopItemRepository.findOneByOrFail({ id });
    }

    async createItem(newShopItem: NewShopItem): Promise<ShopItem> {
        const item = new ShopItem();
        item.name = newShopItem.name;
        item.description = newShopItem.description;
        item.price = newShopItem.price;

        return await this.shopItemRepository.save(item);
    }

    async removeItem(id: string): Promise<DeleteResult> {
        return await this.shopItemRepository.delete(id);
    }

    async addBoughtCounter(id: string, amount: number) {
        await this.shopItemRepository.update(id, { wasEverBought: true });
        const item = await this.shopItemRepository.findOneByOrFail({ id });
        item.boughtCounter += amount;
        await this.shopItemRepository.save(item);
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
