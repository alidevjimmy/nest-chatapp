import { Schema } from "mongoose";
import { UserSchema } from "src/users/schema/user.schema";
import { Room } from "../interface/room.interface";
import { MessageSchema } from "./message.schema";

const room = new Schema({
    // name : {type : String , required : true},
    // isUser : {type : Boolean , default : false},
    // isPrivate : {type : Boolean , default : false},
    users : [{type : [Schema.Types.ObjectId] , ref : "User"}],
    messages : [{type : [Schema.Types.ObjectId] , ref : "Message"}],
    created : {type : Date , default : Date.now},
    updated : {type : Date , default : Date.now},
})

room.pre<Room>('save' , function(next) {
    const date = new Date
    this.updated = date
    next()
})

export const RoomSchema = room