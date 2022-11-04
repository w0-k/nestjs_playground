import { Injectable } from '@nestjs/common';
import { Basket } from 'src/basket/basket.entity';
import { NewUser } from 'src/dto/user.dto';
import { CreateUserRepsonse, GetUserResponse } from 'src/interfaces/user';
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

    async getUser(userId: string): Promise<GetUserResponse> {
        const user = await User.findOne({
            relations: ["basket"],
            where: {
                id: userId
            }
        });

        if (!user) {
            throw new Error("User doesn't exist.");
        }

        return user;
    }
}
