import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UserObj } from 'src/decorators/user-object.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/user.entity';

@Controller('/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    @Post("/login")
    async userRegiester(
        @Body() req: AuthLoginDto,
        @Res() res: Response
    ): Promise<any> {
        return await this.authService.login(req, res);
    }

    @Get("/logout")
    @UseGuards(AuthGuard("jwt"))
    async logout(
        @UserObj() user: User,
        @Res() res: Response,
    ) {
        return await this.authService.logout(user, res);
    }
}
