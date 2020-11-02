import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { create } from "domain";
import { Model } from "mongoose";
import { check } from "prettier";
import { User } from "src/users/interface/user.interface";
import { UserRegisterDto, UserLoginDto } from "./tdo/user.dto";
import * as bcrypt from "bcryptjs"
import { JwtService } from "./jwt/jwt.service";

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private readonly userModel : Model<User> , private jwtService : JwtService) {}

    // register user
    async register(user : UserRegisterDto) : Promise<User>{
        const {username , email ,password} = user
        const checkUser = await this.userModel.find({$or : [{username} , {email}]}).countDocuments()
        if (checkUser > 0) {
            throw new HttpException('user already exists!' , HttpStatus.BAD_REQUEST)
        }
        const createdUser = new this.userModel(user)
        return (await createdUser.save()).schema.methods.serialize(createdUser , true)
    }

    // login user
    async login(user : UserLoginDto) : Promise<any>{
        const {email , password} = user
        const getUser = await this.userModel.findOne().where('email' , email).exec()
        if (!getUser || !bcrypt.compare(password , getUser.password)) {
            throw new HttpException('email or password incurrect!' , HttpStatus.BAD_REQUEST)
        }
        const createUser = await this.userModel.findById(getUser._id);
        return await createUser.schema.methods.serialize(getUser , true)
    }

}