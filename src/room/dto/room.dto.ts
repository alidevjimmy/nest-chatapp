import { IsBoolean, IsDefined, IsString } from "class-validator";

export class RoomDto {
    @IsString()
    @IsDefined()
    name : string

    @IsString()
    @IsDefined()
    description : string

    @IsBoolean()
    isUser?: boolean

    @IsBoolean()
    isPrivate?: boolean
}