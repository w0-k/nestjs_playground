import { Injectable } from '@nestjs/common';
import { NewShopItem } from 'src/dto/new-shop-item.dto';
import { DeleteResult } from 'typeorm';
import { GetPaginatedListOfProductsResponse } from 'src/interfaces/shop';
import { ShopItem } from './shop-item.entity';

@Injectable()
export class ShopService {
    async getItems(pageNumber: number = 1): Promise<GetPaginatedListOfProductsResponse> {
        const maxOnPage = 2;

        const [items, count] = await ShopItem.findAndCount({
            skip: maxOnPage * (pageNumber - 1),
            take: maxOnPage,
        });

        const totalPages = Math.ceil(count / maxOnPage); 
        
        return {
            items,
            pagesCount: totalPages
        };
    }
    
    async getItem(id: string): Promise<ShopItem> {
        return await ShopItem.findOneByOrFail({ id });
    }

    async getItemByName(name: string): Promise<ShopItem> {
        const shopItem = await ShopItem.findOneBy({ name });

        if (!shopItem) {
            throw new Error("Item not available in the shop.");
        }

        return shopItem;
    }
    
    async findProducts(searchTerm: string): Promise<ShopItem[]> {
        return await ShopItem
            .createQueryBuilder()
            .where("shopItem.description like :searchTerm", {
                searchTerm: `%${searchTerm}%`
            })
            .orderBy('shopItem.price', 'ASC')
            .getMany();
    }

    async createItem(newShopItem: NewShopItem): Promise<ShopItem> {
        const item = new ShopItem();
        item.name = newShopItem.name;
        item.description = newShopItem.description;
        item.price = newShopItem.price;

        await item.save();
        
        return item;
    }

    async removeItem(id: string): Promise<DeleteResult> {
        return await ShopItem.delete(id);
    }

    async getPrice(name: string): Promise<number> {
        const { items } = await this.getItems();
        return items.find(item => item.name === name).price;
    } 
}
