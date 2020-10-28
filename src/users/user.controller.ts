import { Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('users')
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