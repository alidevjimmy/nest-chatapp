import { Schema } from "mongoose";
import * as bcrypt from 'bcryptjs'
import { User } from "../interface/user.interface";
import { JwtService } from "src/auth/jwt/jwt.service";
import { RoomSchema } from "src/room/schema/room.schema";
import { MessageSchema } from "src/room/schema/message.schema";

const user = new Schema({
    username : {type : String , required : true ,index : true, unique : true},
    email : {type : String , required : true , unique : true},
    password : {type : String , required : true , minlength : 6},
    isActive : {type : Boolean , required : true , default : false},
    rooms : [{type : Schema.Types.ObjectId , ref : "Room"}],
    message : [{type : Schema.Types.ObjectId , ref : "Message"}],
    created : {type : Date , defaule : Date.now},
    updated : {type : Date , defaule : Date.now},
})



user.pre<User>('save' , async function(next) {
    const date = new Date()
    this.updated = date
    this.password = await bcrypt.hash(this.password , 10)
    next()
})

user.methods.serialize =function(user , showToken : boolean = false) {
    const {_id, isActive ,username ,email , password , created , updated} = user
    const res = {_id , username , email , token : null}
    const jwtSerivice = new JwtService(user)
    const token = jwtSerivice.token({
        _id, isActive ,username ,email , password , created , updated
    })
    if (showToken) {
        res.token = token
    }
    return res
} 


export const UserSchema = user
