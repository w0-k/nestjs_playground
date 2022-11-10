import { Controller, Delete, Get, Param, Post, Body, UseInterceptors, UploadedFiles, Res } from '@nestjs/common';
import { ShopService } from "./shop.service";

import { 
    GetListOfProductsResponse,
    GetOneProductResponse,
    CreateProductResponse,
    GetPaginatedListOfProductsResponse,
} from "../interfaces/shop";
import { NewShopItem } from 'src/dto/new-shop-item.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { multerStorage, storageDir } from 'src/utils/storage';
import { MulterDiskUploadFiles } from 'src/interfaces/files';

@Controller('/shop')
export class ShopController {
    constructor(
        private readonly shopService: ShopService
    ) {}
    
    @Get("/find/:searchTerm")
    async findItem(
        @Param("searchTerm") searchTerm: string
    ): Promise<GetListOfProductsResponse> {
        return this.shopService.findProducts(searchTerm);
    }
    
    @Get("/:pageNumber")
    async getCartItems(
        @Param("pageNumber") pageNumber: string,
    ): Promise<GetPaginatedListOfProductsResponse> {
        return await this.shopService.getItems(Number(pageNumber));
    }

    @Get("/:id")
    async getOneCartItem(
        @Param("id") id: string,
    ): Promise<GetOneProductResponse> {
        return await this.shopService.getItem(id);
    }

    @Get("/photo/:id")
    async getPhoto(
        @Param("id") id: string,
        @Res() res: any
    ) {
        return await this.shopService.getPhoto(id, res);
    }

    @Post("/")
    @UseInterceptors(
        FileFieldsInterceptor(
            [ { name: "photo", maxCount: 1 } ],
            { storage: multerStorage(path.join(storageDir(), "product-photos")) }
        )
    )
    async createProduct(
        @Body() newShopItem: NewShopItem,
        @UploadedFiles() files: MulterDiskUploadFiles
    ): Promise<CreateProductResponse> {
        return this.shopService.createItem(newShopItem, files);
    }

    @Delete("/:id")
    async deleteCartItem(
        @Param("id") id: string,
    ) {
        return await this.shopService.removeItem(id);
    }
}
