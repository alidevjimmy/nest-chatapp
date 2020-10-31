import { Module } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { RoomModule } from "src/room/room.module";
import { ChatGateway } from "./chat.gateway";

@Module({
    imports : [AuthModule , RoomModule],
    providers : [ChatGateway]
})
export class ChatModule {}
