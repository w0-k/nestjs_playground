export interface ItemInterface {
    id: string;
    name: string;
    description: string;
    price: number;
}

export type GetListOfProductsResponse = ItemInterface[];
export type GetOneProductResponse = ItemInterface;
export type CreateProductResponse = ItemInterface;