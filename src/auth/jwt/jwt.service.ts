import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import * as jwt from 'jsonwebtoken'
import { APP_CONFIG } from "src/shared/config";
import { UserService } from "src/users/user.service";

@Injectable()
export class JwtService {
    constructor(private readonly userService: UserService) { }

    token(user: {
        "_id" , "isActive" , "username" , "email" ,"password" , "created" , "updated"
    }): Promise<string> {
        const token = jwt.sign(user, APP_CONFIG.jwtSecert, { expiresIn: '7d' })
        return token
    }

    async verify(token: string, isWs: boolean = false) {
        try {
            const payload = jwt.verify(token, APP_CONFIG.jwtSecert)
            const user = await this.userService.find(payload._id)
            if (!user) {
                if (isWs) {
                    throw new WsException('token is invalid')
                } else {
                    throw new HttpException('invalid token 1)', HttpStatus.UNAUTHORIZED)
                }
            }

            return user
        }
        catch (e) {
            if (isWs) {
                throw new WsException('token is invalid')
            } else {
                throw new HttpException('invalid toeken 2)', HttpStatus.UNAUTHORIZED)
            }
        }
    }


}