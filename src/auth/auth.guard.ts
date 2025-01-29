import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor (private readonly jwtService:JwtService, private readonly configService:ConfigService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>("JWT_KEY")
      })
      request["user"] = payload
    } catch {
      throw new UnauthorizedException()
    }
    return true
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const {authorization} = request.headers
    if(!authorization){
      throw new UnauthorizedException()
    }
    const [type, token] = authorization.split(" ") ?? []
    return type === "Bearer" ? token : undefined
  }
}
