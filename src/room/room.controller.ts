import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UsePipes, ValidationPipe } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { APP_CONFIG } from "src/shared/config";
import { RoomDto } from "./dto/room.dto";
import { Room } from "./interface/room.interface";
import { RoomService } from "./room.service";

@Controller(`${APP_CONFIG.apiVersion}/rooms`)
export class RoomController {
    constructor(private readonly roomService : RoomService) {}

    @Get()
    async findAll() {
        return await this.roomService.findAll()
    }

    @Get(':id')
    async find(@Param('id') id : string) {
        if (!id) {throw new HttpException('missing id!' , HttpStatus.BAD_REQUEST)}
        return await this.roomService.find(id) 
    }    

    @UsePipes(new ValidationPipe)
    @Post()
    async create(@Body() data : RoomDto) {
        return this.roomService.create(data)
    }

}