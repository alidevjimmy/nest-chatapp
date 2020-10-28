import { Document } from "mongoose";

export class User extends Document {
    id : string
    username : string
    email : string
    password : string
    isActive : boolean
    created : Date
    updated : Date
    deleted : Date
}