import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/auth/auth.module";
import { JwtService } from "src/auth/jwt/jwt.service";
import { MessageSchema } from "src/room/schema/message.schema";
import { RoomSchema } from "src/room/schema/room.schema";
import { UserSchema } from "./schema/user.schema";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports : [AuthModule , MongooseModule.forFeature([{name : "User" , schema : UserSchema},
    {name : "Room" , schema : RoomSchema} ,{name : "Message" , schema : MessageSchema}])],
    controllers : [UserController],
    providers : [UserService]
})
export class UserModule {}