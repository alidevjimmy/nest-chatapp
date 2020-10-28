import { IsDefined, IsEmail, IsString, MinLength } from "class-validator";

export class UserRegisterDto {
    @IsString()
    @IsDefined()
    username : string

    @IsString()
    @IsEmail()
    @IsDefined()
    email : string

    @IsString()
    @IsDefined()
    @MinLength(6)
    password : string

}

export class UserLoginDto {
    @IsString()
    @IsEmail()
    @IsDefined()
    email : string

    @IsString()
    @IsDefined()
    @MinLength(6)
    password : string
}