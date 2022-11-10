import { Injectable } from '@nestjs/common';
import { DataCache } from './cache.entity';

@Injectable()
export class CacheService {
    async readCache(cacheKey: string) {
        return await DataCache.findOneBy({ cacheKey });
    }

    async writeCache(cacheKey: string, data: unknown) {
        // remove old cacheEntry
        await DataCache.delete({ cacheKey });

        const cachedData = new DataCache();
        cachedData.cacheKey = cacheKey;
        cachedData.data = JSON.stringify(data);
        await cachedData.save();
    }
}
