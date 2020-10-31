import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RoomDto } from "./dto/room.dto";
import { Message } from "./interface/message.interface";
import { Room } from "./interface/room.interface";

@Injectable()
export class RoomService {
    constructor(@InjectModel('Room') private roomModel: Model<Room>) { }

    async findAll(): Promise<Room[]> {
        const rooms = await this.roomModel.find().exec()
        return rooms
    }

    async find(id: string): Promise<Room> {
        const room = await this.roomModel.findById(id).exec()
        if (!room) { throw new HttpException('room not found!', HttpStatus.BAD_REQUEST) }
        return room
    }

    async create(data: RoomDto | Room): Promise<Room> {
        const room = new this.roomModel(data)
        return await room.save()
    }

    async addMessage(message: Message, id: string) {
        const room = await this.roomModel.findById(id).exec()
        room.messages.push(message)
        room.users.push(message.user)
        return await room.save()
    }

    async findMessages(id: string, limit: number): Promise<Message[]> {
        let room = await this.findByLimit(id, limit)

        if (!room) {
            const userRoom = new this.roomModel({ _id: id, name: id })
            room = await this.create(userRoom)
        }

        return room.messages
    }

    async findByLimit(id: string, limit: number): Promise<Room | null> {
        return await this.roomModel.findById(id).slice('messages', limit).exec()
    }
    await
    async findById(id: string): Promise<Room | null> {
        return await this.roomModel.findById(id).exec();
    }

    async findOne(options?: any, fields?: any): Promise<Room | null> {
        return await this.roomModel.findOne(options, fields).exec();
    }

    async update(id: string, newValue: Room): Promise<Room | null> {
        return await this.roomModel.findByIdAndUpdate(id, newValue).exec();
    }

    async delete(id: string): Promise<Room | null> {
        return await this.roomModel.findByIdAndRemove(id).exec();
    }
}