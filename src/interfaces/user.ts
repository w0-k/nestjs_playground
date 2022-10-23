import { Basket } from "src/basket/basket.entity";
import { User } from "src/user/user.entity";

export type CreateUserRepsonse = User;
export type GetListOfUsers = User[];
export type GetPaginatedListOfUsersResponse = {
    users: User[];
    pagesCount: number;
};