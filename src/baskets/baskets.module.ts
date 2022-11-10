import { Module } from '@nestjs/common';
import { CacheModule } from 'src/cache/cache.module';
import { BasketsController } from './baskets.controller';
import { BasketsService } from './baskets.service';

@Module({
  imports: [CacheModule],
  controllers: [BasketsController],
  providers: [BasketsService]
})
export class BasketsModule {}
