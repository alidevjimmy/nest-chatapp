import { Document } from "mongoose"
import { User } from "src/users/interface/user.interface"

export class Message extends Document{
    message : string
    user : User
    date : Date
}