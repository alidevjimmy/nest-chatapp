import { IsBoolean, IsDefined, IsString } from "class-validator";
import { User } from "src/users/interface/user.interface";

export class RoomDto {
    // @IsString()
    // @IsDefined()
    // name : string = ""

    @IsDefined()
    @IsString()
    tergetUserId : string

    // @IsBoolean()
    // isUser?: boolean

    // @IsBoolean()
    // isPrivate?: boolean

    
}