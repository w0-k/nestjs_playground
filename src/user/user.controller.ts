import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NewUser } from 'src/dto/user.dto';
import { CreateUserRepsonse, GetPaginatedListOfUsersResponse } from 'src/interfaces/user';
import { UserService } from './user.service';
@Controller('/user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get("/:userId")
    async getUser(
        @Param("userId") userId: string,
    ) {
        return this.userService.getUser(userId);
    }

    @Post("/")
    async addUser(
        @Body() newUser: NewUser
    ): Promise<CreateUserRepsonse> {
        debugger;
        return this.userService.addUser(newUser);
    }
}
