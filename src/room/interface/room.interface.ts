import { Document } from "mongoose"
import { User } from "src/users/interface/user.interface"
import { Message } from "./message.interface"

export class Room extends Document {
    name : string
    description ?: string
    isUser : boolean
    isPrivate : boolean
    users ?: User[]
    messages : Message[]
    created : Date
    updated : Date
}