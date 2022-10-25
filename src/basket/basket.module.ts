import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { ShopModule } from "../shop/shop.module";
import { BasketController } from "./basket.controller";
import { BasketService } from "./basket.service";

@Module({
  imports: [ 
    ShopModule,
    UserModule, 
  ],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}