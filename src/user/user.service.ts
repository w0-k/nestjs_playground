import { Injectable } from '@nestjs/common';
import { Basket } from 'src/basket/basket.entity';
import { NewUser } from 'src/dto/user.dto';
import { CreateUserRepsonse, GetPaginatedListOfUsersResponse } from 'src/interfaces/user';
import { User } from './user.entity';

@Injectable()
export class UserService {
    async addUser(newUser: NewUser): Promise<CreateUserRepsonse> {
        const user = new User();
        user.name = newUser.name;
        user.lastName = newUser.lastName;
        user.email = newUser.email;
        user.phoneNumber = newUser.phoneNumber;

        await user.save();

        const basket = new Basket();
        basket.items = [];

        await basket.save();

        user.basket = basket;
        
        user.save();

        return user;
    }

    async getUsers(pageNumber: number = 1): Promise<GetPaginatedListOfUsersResponse> {
        const maxOnPage = 2;

        const [items, count] = await User.findAndCount({
            relations: ["basket"],
            skip: maxOnPage * (pageNumber - 1),
            take: maxOnPage,
        });

        const totalPages = Math.ceil(count / maxOnPage);

        return {
            users: items,
            pagesCount: totalPages,
        };
    }
}
