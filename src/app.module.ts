import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { BasketModule } from './basket/basket.module';
import { ShopModule } from './shop/shop.module';

const dbConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'shop',
  entities: ["dist/**/**.entity{.ts,.js}"],
  logging: true,
  migrations: ["dist/migration/*.js"]
};

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    BasketModule,
    ShopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
