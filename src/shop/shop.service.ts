import * as fs from "fs";
import * as path from "path";

import { Injectable } from '@nestjs/common';
import { NewShopItem } from 'src/dto/new-shop-item.dto';
import { DeleteResult } from 'typeorm';
import { CreateProductResponse, GetPaginatedListOfProductsResponse } from 'src/interfaces/shop';
import { ShopItem } from './shop-item.entity';
import { ItemInterface } from "../interfaces/shop";
import { MulterDiskUploadFiles } from 'src/interfaces/files';
import { storageDir } from 'src/utils/storage';

@Injectable()
export class ShopService {
    private adaptItem(shopItem: ShopItem): ItemInterface {
        const {id, price, description, name} = shopItem;
        return {id, price, description, name};
    }

    async getItems(pageNumber: number = 1): Promise<GetPaginatedListOfProductsResponse> {
        const maxOnPage = 2;

        const [items, count] = await ShopItem.findAndCount({
            skip: maxOnPage * (pageNumber - 1),
            take: maxOnPage,
        });

        const totalPages = Math.ceil(count / maxOnPage); 
        
        return {
            items: items.map(this.adaptItem),
            pagesCount: totalPages
        };
    }
    
    async getItem(id: string): Promise<ShopItem> {
        return await ShopItem.findOneByOrFail({ id });
    }

    async getPhoto(id: string, res: any) {
        try {
            const photo = await ShopItem.findOneBy({ id });

            if (!photo) {
                throw new Error("No entry,");
            }

            if(!photo.photoFn) {
                throw new Error("No photo for this entity!");
            }

            res.sendFile(
                photo.photoFn,
                {
                    root: path.join(storageDir(), "product-photos")
                }
            )
        } catch(e) {
            res.json({
                error: e.message,
            });
        }
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

    async createItem(newShopItem: NewShopItem, files: MulterDiskUploadFiles): Promise<CreateProductResponse> {
        const photo = files?.photo?.[0] ?? null;

        try {
            const item = new ShopItem();
            item.name = newShopItem.name;
            item.description = newShopItem.description;
            item.price = newShopItem.price;

            if (photo) {
                item.photoFn = photo.filename;
            }
    
            await item.save();
            
            return this.adaptItem(item);
        } catch(e) {
            try {
                if(photo) {
                    fs.unlinkSync(path.join(storageDir(), "product-photos", photo.filename));
                }
            } catch(e2) {}
            throw e;
        }
    }

    async removeItem(id: string): Promise<DeleteResult> {
        return await ShopItem.delete(id);
    }

    async getPrice(name: string): Promise<number> {
        const { items } = await this.getItems();
        return items.find(item => item.name === name).price;
    } 
}
