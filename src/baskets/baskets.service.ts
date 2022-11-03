import { Injectable } from '@nestjs/common';
import { Basket } from 'src/basket/basket.entity';

@Injectable()
export class BasketsService {
    async getBaskets() {
        return await Basket.find({
            relations: ["items"]
        });
    }
}
