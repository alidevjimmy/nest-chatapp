import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/users/interface/user.interface";
import { RoomDto } from "./dto/room.dto";
import { Message } from "./interface/message.interface";
import { Room } from "./interface/room.interface";

@Injectable()
export class RoomService {
    constructor(@InjectModel('Room') private roomModel: Model<Room>, @InjectModel('User') private userModel: Model<User>) { }

    async findAll(user: User): Promise<Room[]> {
        const rooms = await this.roomModel.find({users : {$in :[user]}}).exec()
        return rooms
    }

    async find(_id: string, user: User): Promise<Room> {
        const room = await this.roomModel.findById(_id).exec()
        if (!room) { throw new HttpException('room not found!', HttpStatus.BAD_REQUEST) }
        if (!room.users.includes(user)) { throw new HttpException('premission denied!', HttpStatus.BAD_REQUEST) }
        return room
    }

    async findUsers(username: string , user : User): Promise<User[] | Room[]> {
        if (!username) {
            return this.findAll(user)
        }
        const users = await this.userModel.find({username : new RegExp(`.*${username}.*` , 'i')}).exec();
        const serializer = await users.map(user => {
            return user.schema.methods.serialize(user)
        })
        return serializer
    }

    async create(data: RoomDto, user: User): Promise<Room> {
        const targetUser = await this.getUserById(data.tergetUserId)
        const roomExists = await this.roomModel.findOne({$or : [{users : [user , targetUser]} , {users : [targetUser , user]}]}).exec()
        if (roomExists) {
            return roomExists
        }
        let createRoomData = {
            users : [user._id , targetUser._id],
            messages : [],
        }
        const room = new this.roomModel(createRoomData)
        return await room.save()
    }


    async addMessage(message: Message, id: string) {
        const room = await this.roomModel.findById(id).exec()
        room.messages.push(message)
        room.users.push(message.user)
        return await room.save()
    }

    async findMessages(id: string, limit: number, user?: User): Promise<Message[]> {
        let room = await this.findByLimit(id, limit)

        if (!room) {
            const data = {
                tergetUserId : user._id,
            }
            room = await this.create(data, user)
        }

        return room.messages
    }

    async getUserById(_id : string) {
        const user = await this.userModel.findById(_id).exec()
        if (!user) {
            throw new HttpException('user not found!' , HttpStatus.BAD_REQUEST)
        }
        return user
    }

    async findByLimit(id: string, limit: number): Promise<Room | null> {
        return await this.roomModel.findById(id).slice('messages', limit).exec()
    }
    
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