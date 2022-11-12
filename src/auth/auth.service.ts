import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { User } from 'src/user/user.entity';
import { hashPwd } from 'src/utils/hash-pwd';
import { AuthLoginDto } from './dto/auth-login.dto';
import { v4 as uuid } from "uuid";
import { sign } from "jsonwebtoken"
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
    private createToken(currentTokenId: string): {
        accessToken: string,
        expiresIn: number,
    } {
        const payload: JwtPayload = { id: currentTokenId };
        const expiresIn = 60 * 60 * 24;
        const accessToken = sign(payload, "#@$#QWFSD@#fdsfasd#@TDGFASDSADAS43tjHGHDFG%U^&432ew", { expiresIn });

        return {
            accessToken,
            expiresIn,
        }
    }

    private async generateToken(user: User): Promise<string> {
        let token: string;
        let userWithThisToken = null;

        do {
            token = uuid();
            userWithThisToken = await User.findOneBy({ currentTokenId: token });
        } while(!userWithThisToken);

        user.currentTokenId = token;
        await user.save();

        return token;
    }   

    async login(req: AuthLoginDto, res: Response): Promise<any> {
        try {
            const user = await User.findOneBy({
                email: req.email,
                pwdHash: hashPwd(req.pwd)
            });

            if(!user) {
                return res.json({ error: "Invalid login data!"});
            }

            const token = await this.createToken(await this.generateToken(user));

            return res.cookie("jwt", token.accessToken, {
                secure: false,
                domain: "localhost",
                httpOnly: true,
            })
            .json({ ok: true });
        } catch(e) {
            return res.json({ error: e.message });
        }
    }
}
