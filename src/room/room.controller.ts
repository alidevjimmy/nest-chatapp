import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { GetUser } from "src/auth/decorator/user.decorator";
import { AuthGuard } from "src/auth/guard/auth.guard";
import { APP_CONFIG } from "src/shared/config";
import { User } from "src/users/interface/user.interface";
import { RoomDto } from "./dto/room.dto";
import { Room } from "./interface/room.interface";
import { RoomService } from "./room.service";

@Controller(`${APP_CONFIG.apiVersion}/rooms`)
export class RoomController {
    constructor(private readonly roomService : RoomService) {}
    
    @UseGuards(AuthGuard)
    @Get()
    async findAll(@GetUser() user : User) {
        return await this.roomService.findAll(user)
    }

    @UseGuards(AuthGuard)
    @Get('findUsers')
    async findUsers(@Query('username') username : string , @GetUser() user : User)  {
        return await this.roomService.findUsers(username , user)
    }

    @UseGuards(AuthGuard)
    @Get('@/:id')
    async find(@Param('id') id : string , @GetUser() user : User) {
        if (!id) {throw new HttpException('missing id!' , HttpStatus.BAD_REQUEST)}
        return await this.roomService.find(id , user) 
    }    

    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe)
    @Post()
    async create(@Body() data : RoomDto , @GetUser() user : User) {
        return this.roomService.create(data , user)
    }



}