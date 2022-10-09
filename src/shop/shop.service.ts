import { Injectable } from '@nestjs/common';

import { ItemInterface } from "../interfaces/shop";

@Injectable()
export class ShopService {
    items: ItemInterface[];

    constructor() {
        this.items = [
            {
                name: "item1",
                description: "test descr 1",
                price: 200,
            },
            {
                name: "item2",
                description: "test descr 2",
                price: 100,
            },
            {
                name: "item3",
                description: "test descr 3",
                price: 400,
            }
        ];
    }

    getItems(): ItemInterface[] {
        return this.items;
    }

    getPrice(name: string): number {
        return this.items.find(item => item.name === name).price;
    } 

    isItemAvailable(itemName: string): boolean {
        return Boolean(this.items.find(item => item.name === itemName));
    }
}
