import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";
import { User } from "./interface/user.interface";

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel : Model<User>) {}

    async findAll(options ?: any): Promise<User[]> {
        let users = await this.userModel.find(options).exec()
        const serializer = users.map(user => {
            return user.schema.methods.serialize(user)
        })

        return serializer
    }

    async find(id : string): Promise<User> {
        let user = await this.userModel.findById(id).exec()
        return user.schema.methods.serialize(user)
    }

}