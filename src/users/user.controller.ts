import { Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { APP_CONFIG } from "src/shared/config";
import { UserService } from "./user.service";

@Controller(`${APP_CONFIG.apiVersion}/users`)
export class UserController {
    constructor(private readonly userService : UserService) {}

    @Get()
    async findAll() {
        return await this.userService.findAll()
    }

    @Get(":id")
    async find(@Param('id') id : string) {
        if (!id ) throw new HttpException('user not found!' , HttpStatus.BAD_REQUEST)
        return await this.userService.find(id)
    }

}