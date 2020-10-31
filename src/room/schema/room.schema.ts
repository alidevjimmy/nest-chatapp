import { Schema } from "mongoose";
import { UserSchema } from "src/users/schema/user.schema";
import { Room } from "../interface/room.interface";
import { MessageSchema } from "./message.schema";

const room = new Schema({
    name : {type : String , required : true},
    description : {type : String},
    isUser : {type : Boolean , default : false},
    isPrivate : {type : Boolean , default : false},
    users : [UserSchema],
    message : [MessageSchema],
    created : {type : Date , default : Date.now},
    updated : {type : Date , default : Date.now},
})

room.pre<Room>('save' , function(next) {
    const date = new Date
    this.updated = date
    next()
})

export const RoomSchema = room