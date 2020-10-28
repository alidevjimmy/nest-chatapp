import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";
import { JwtService } from "src/auth/jwt/jwt.service";
import { UserSchema } from "./schema/user.schema";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports : [AuthModule , MongooseModule.forFeature([{name : "User" , schema : UserSchema}])],
    controllers : [UserController],
    providers : [UserService]
})
export class UserModule {}