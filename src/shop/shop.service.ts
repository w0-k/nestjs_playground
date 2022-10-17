import { Injectable } from '@nestjs/common';
import { NewShopItem } from 'src/dto/new-shop-item.dto';
import { DeleteResult, Repository } from 'typeorm';
import { GetPaginatedListOfProductsResponse } from 'src/interfaces/shop';
import { ShopItem } from './shop-item.entity';
import { ShopItemDetails } from './shop-item-details.entity';

@Injectable()
export class ShopService {
    async getItems(pageNumber: number = 1): Promise<GetPaginatedListOfProductsResponse> {
        const maxOnPage = 2;

        const [items, count] = await ShopItem.findAndCount({
            // relations: ["details", "sets"],
            skip: maxOnPage * (pageNumber - 1),
            take: maxOnPage,
        });

        const totalPages = Math.ceil(count / maxOnPage ); 
        
        return {
            items,
            pagesCount: totalPages
        };
    }
    
    async getItem(id: string): Promise<ShopItem> {
        return await ShopItem.findOneByOrFail({ id });
    }
    
    async findProducts(searchTerm: string): Promise<ShopItem[]> {
        return await ShopItem
            .createQueryBuilder("shopItem")
            .where("shopItem.description like :searchTerm", {
                searchTerm: `%${searchTerm}%`
            })
            .getMany();
    }

    async createItem(newShopItem: NewShopItem): Promise<ShopItem> {
        const item = new ShopItem();
        item.name = newShopItem.name;
        item.description = newShopItem.description;
        item.price = newShopItem.price;

        await item.save();

        const details = new ShopItemDetails();
        details.color = "green";
        details.width = 20;

        await details.save();

        item.details = details;

        await item.save();

        return item;
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
        const { items } = await this.getItems();
        return items.find(item => item.name === name).price;
    } 

    async isItemAvailable(itemName: string): Promise<boolean> {
        const { items } = await this.getItems();
        return Boolean(items.find(item => item.name === itemName));
    }
}
