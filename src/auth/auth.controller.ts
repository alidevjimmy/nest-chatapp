import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { APP_CONFIG } from "src/shared/config";
import { AuthService } from "./auth.service";
import { UserLoginDto, UserRegisterDto } from "./tdo/user.dto";

@Controller(`${APP_CONFIG.apiVersion}/auth`)
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @UsePipes(new ValidationPipe)
    @Post(`register`)
    async register(@Body() data: UserRegisterDto) {
        return await this.authService.register(data)
    }

    @Post('login')
    async login(@Body() data : UserLoginDto) {
        return await this.authService.login(data)
    }

}