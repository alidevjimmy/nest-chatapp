import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/users/schema/user.schema";
import { RoomController } from "./room.controller";
import { MessageSchema } from "./schema/message.schema";
import { RoomSchema } from "./schema/room.schema";
import {RoomService} from './room.service'
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports : [AuthModule,MongooseModule.forFeature([
        {name : 'User' , schema : UserSchema}, 
        {name : 'Message' , schema : MessageSchema},
        {name : 'Room' , schema : RoomSchema}
    ])],
    controllers : [RoomController],
    providers : [RoomService]
})
export class RoomModule {}