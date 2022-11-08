import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable, of, tap } from "rxjs";


@Injectable()
export class MyCacheInterceptor implements NestInterceptor {
    constructor(
        private reflector: Reflector,
    ) {}

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        const method = context.getHandler();

        const cachedData = this.reflector.get<any>("cacheData", method);
        const cachedTime = this.reflector.get<Date>("cacheTime", method);
        

        if (cachedData && (Number(cachedTime) + 10000 > Number(new Date()))) {
            console.log("using cached data");
            return of(cachedData);
        }

        console.log("generating data");
        return next.handle().pipe(
            tap(data => {
                Reflect.defineMetadata("cacheData", data, method);
                Reflect.defineMetadata("cacheTime", new Date(), method);
            }),
        );
    }
}