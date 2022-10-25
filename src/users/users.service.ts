import { Injectable } from '@nestjs/common';
import { GetPaginatedListOfUsersResponse } from 'src/interfaces/user';
import { User } from '../user/user.entity';

@Injectable()
export class UsersService {
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
