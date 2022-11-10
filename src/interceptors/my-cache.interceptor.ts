import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable, of, tap } from "rxjs";
import { CacheService } from "src/cache/cache.service";

@Injectable()
export class MyCacheInterceptor implements NestInterceptor {
    constructor(
        private readonly cacheService: CacheService ,
        private reflector: Reflector,
    ) {}

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const controllerName = context.getClass().name;
        const actionName = context.getHandler().name;
        const cacheKey = `${controllerName}_${actionName}`;
        const cacheValidityTime =  this.reflector.get<string>("cacheValidityTime", context.getHandler());
        const cachedData = await this.cacheService.readCache(cacheKey);
        const isCacheValid = Number(cachedData?.createdAt ?? 0) + Number(cacheValidityTime) > Date.now();
        debugger;
        // const cachedData = this.reflector.get<any>("cacheData", method);
        // const cachedTime = this.reflector.get<Date>("cacheTime", method);
    
        // const cachedData = await DataCache.findOneBy({ cacheKey });

        if (cachedData && isCacheValid) {
            console.log("using cached data");
            const parsedData = JSON.parse(cachedData.data);
            return of(parsedData);
        }

        console.log("generating data");
        return next.handle().pipe(
            tap(async (data) => {
                // Reflect.defineMetadata("cacheData", data, method);
                // Reflect.defineMetadata("cacheTime", new Date(), method);
                
                // do I need to wait for cache to be written into database?
                await this.cacheService.writeCache(cacheKey, data);
            }),
        );
    }
}