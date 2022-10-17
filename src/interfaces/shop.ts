import { ShopItem } from "src/shop/shop-item.entity";

export interface ItemInterface {
    id: string;
    name: string;
    description: string;
    price: number;
}

export type GetListOfProductsResponse = ItemInterface[];
export type GetOneProductResponse = ItemInterface;
export type CreateProductResponse = ItemInterface;
export type GetPaginatedListOfProductsResponse = {
    items: ShopItem[];
    pagesCount: number;
};