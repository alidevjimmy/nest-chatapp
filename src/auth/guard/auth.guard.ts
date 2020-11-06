
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus, Controller, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService : JwtService) {}

    async canActivate(
        context: ExecutionContext,
    ) {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization
        if (!token) {
            throw new HttpException('token is invalid', HttpStatus.UNAUTHORIZED)
        }
        const user = await this.validateRequest(token)
        request.user = user
        return true
    }

    private async validateRequest(token: string) {
        const [bearer , getToken] = token.split(' ')
        if (!bearer || bearer != 'Bearer') {
            throw new HttpException('token is invalid', HttpStatus.UNAUTHORIZED)
        }
        return await this.jwtService.verify(getToken)
    }
}
