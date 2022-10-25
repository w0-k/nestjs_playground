import { User } from "src/user/user.entity";

export type GetUserResponse = User;
export type CreateUserRepsonse = User;
export type GetListOfUsers = User[];
export type GetPaginatedListOfUsersResponse = {
    users: User[];
    pagesCount: number;
};