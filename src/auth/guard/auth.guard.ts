
import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus, Controller, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService : JwtService) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization
        if (!token) {
            throw new HttpException('token is invalid', HttpStatus.UNAUTHORIZED)
        }
        this.validateRequest(token)
        return true
    }

    private validateRequest(token: string) {
        const [bearer , getToken] = token.split(' ')
        if (!bearer) {
            throw new HttpException('token is invalid', HttpStatus.UNAUTHORIZED)
        }
        this.jwtService.verify(getToken)
    }
}
