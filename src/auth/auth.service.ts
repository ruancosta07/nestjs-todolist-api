import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDTO, LoginDTO } from './auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    private jwtExpirationTime: number;
    constructor(private readonly prisma: PrismaService, private readonly userService: UsersService, private readonly jwtService: JwtService, private readonly configService: ConfigService) {
        this.jwtExpirationTime = +this.configService.get<number>("JWT_EXPIRATION_TIME")
    }
    async signIn(user: LoginDTO): Promise<AuthResponseDTO> {
        const { email, password } = user
        const [foundUser, userWithPassword] = await Promise.all([
            this.prisma.users.findFirst({ where: { email }, omit: {password:true} }),
            this.prisma.users.findFirst({ where: { email }, })
        ])
        // const foundUser = await this.prisma.users.findFirst({ where: { email }, omit: {password:true} })
        // const userWithPassword = await this.prisma.users.findFirst({ where: { email }, })
        if (!foundUser) {
            throw new UnauthorizedException()
        }
        const passwordMatch = await compare(password, userWithPassword.password)
        if (!passwordMatch) {
            throw new UnauthorizedException()
        }
        const payload = {
            sub: foundUser.id,
            email: foundUser.email,
            name: foundUser.name
        }
        
        const token = this.jwtService.sign(payload)
        return { token, expiresIn: this.jwtExpirationTime, user: foundUser}
    }
}
