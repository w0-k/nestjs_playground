import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NewUser } from 'src/dto/user.dto';
import { CreateUserRepsonse, GetPaginatedListOfUsersResponse } from 'src/interfaces/user';
import { UserService } from './user.service';
@Controller('/user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get("/:pageNumber")
    async users(
        @Param("pageNumber") pageNumber: string,
    ): Promise<GetPaginatedListOfUsersResponse> {
        debugger;
        return this.userService.getUsers(Number(pageNumber));
    }

    @Post("/")
    async addUser(
        @Body() newUser: NewUser
    ): Promise<CreateUserRepsonse> {
        return this.userService.addUser(newUser);
    }
}

// TODO: write controler and service methods for adding user to database