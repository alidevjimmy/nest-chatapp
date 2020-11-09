import { Document } from "mongoose";
import { Room } from "src/room/interface/room.interface";

export class User extends Document {
    _id : string
    username : string
    email : string
    password : string
    isActive : boolean
    created : Date
    updated : Date
    deleted : Date
    token ?: string
    rooms : Room[]
}