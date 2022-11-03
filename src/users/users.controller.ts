import { Controller, Get, Param } from '@nestjs/common';
import { GetPaginatedListOfUsersResponse } from 'src/interfaces/user';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @Get("/:pageNumber")
    async users(
        @Param("pageNumber") pageNumber: string,
    ): Promise<GetPaginatedListOfUsersResponse> {
        debugger;
        return this.usersService.getUsers(Number(pageNumber));
    }
}
