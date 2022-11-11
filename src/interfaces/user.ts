import { User } from "src/user/user.entity";

type PublicUserData = {
    id: string;
    email: string;
    name: string;
    basket: {
        id: string;
    }
};

export type GetUserResponse = PublicUserData;
export type CreateUserRepsonse = PublicUserData;
export type GetListOfUsers = User[];
export type GetPaginatedListOfUsersResponse = {
    users: User[];
    pagesCount: number;
};