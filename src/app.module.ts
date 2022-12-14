import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasketModule } from './basket/basket.module';
import { ShopModule } from './shop/shop.module';

import { dbConfiguration } from "./config/db.config";
import { UserModule } from './user/user.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { BasketsModule } from './baskets/baskets.module';
import { CacheModule } from './cache/cache.module';
import { CronModule } from './cron/cron.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      load: [dbConfiguration]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({ ...configService.get("database")})
    }),
    BasketModule,
    ShopModule,
    UserModule,
    BasketsModule,
    CacheModule,
    CronModule,
    AuthModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
