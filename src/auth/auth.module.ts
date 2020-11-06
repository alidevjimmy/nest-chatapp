import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/users/schema/user.schema";
import { UserService } from "src/users/user.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthGuard } from "./guard/auth.guard";
import { JwtService } from "./jwt/jwt.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: "User", schema: UserSchema }])],
    controllers: [AuthController],
    providers: [AuthService, JwtService, UserService, AuthGuard],
    exports : [JwtService]
})
export class AuthModule {}