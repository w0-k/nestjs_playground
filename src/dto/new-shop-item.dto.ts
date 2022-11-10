import { IsNumber, IsString } from "class-validator";

export class NewShopItem {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;
}