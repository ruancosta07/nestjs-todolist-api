import { HttpException, HttpStatus, Inject, Injectable, Scope, UnauthorizedException } from '@nestjs/common';
import { UserDTO } from './users.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from "bcrypt"
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable({ scope: Scope.REQUEST })
export class UsersService {
    constructor(@Inject(REQUEST) private readonly request: Request, private readonly prisma: PrismaService, private readonly jwtService: JwtService, private readonly configService: ConfigService) {

    }

    async getUser(id: string) {
        const foundUser = await this.prisma.users.findUnique({
            where: { id },
            omit: {
                password: true
            },
            include: {
                todos:true
            }
        })
        const [,token] = this.request.headers?.authorization?.split(" ")
        const decodedToken = this.jwtService.verify(token, {
            secret: this.configService.get("JWT_SECRET")
        }) as {
            sub:string;
            name:string;
            email:string;
        }
        const tokenUser = await this.prisma.users.findUnique({
            where: {
                id:decodedToken.sub
            }
        })
        if(foundUser.id !== tokenUser.id){
            throw new UnauthorizedException()
        }
        if (!foundUser) {
            throw new UnauthorizedException()
        }
        return foundUser
    }

    async createUser(user: UserDTO) {
        const userExists = await this.prisma.users.findFirst({ where: { email: user.email }, omit: {password:true} })
        if (userExists) {
            throw new UnauthorizedException("Email já cadastrado")
        }
        user.password = await hash(user.password, 12)
        const newUser = await this.prisma.users.create({ data: user })
        return {message: "Usuário criado com sucesso",...newUser,}
    }

    async editUser(id: string, user: UserDTO) {
        const foundUser = await this.prisma.users.findUnique({ where: { id } })
        if (!foundUser) {
            throw new UnauthorizedException("")
        }
        await this.prisma.users.update({
            where: {
                id
            },
            data: {
                email: user.email,
                name: user.name,
                password: user.password ? await hash(user.password, 12) : foundUser.password
            }
        })
        throw new HttpException("Usuário alterado com sucesso", HttpStatus.ACCEPTED,)

    }


    async deleteUser(id: string) {
        const foundUser = await this.prisma.users.findUnique({ where: { id } })
        const [, token] = this.request.headers.authorization.split(" ")
        const decodedToken = this.jwtService.verify(token, {
            secret: this.configService.get("JWT_SECRET")
        }) as {
            sub: string;
            email: string;
            name: string
        }

        const reqUser = await this.prisma.users.findUnique({
            where: {
                id: decodedToken.sub
            }
        })

        if (foundUser.id !== reqUser.id) {
            throw new UnauthorizedException()
        }

        if (!foundUser) {
            throw new UnauthorizedException()
        }

        await Promise.all([
            this.prisma.users.delete({
                where: {
                    id: foundUser.id
                }
            }),
            this.prisma.todos.deleteMany({
                where: {
                    userId: foundUser.id
                }
            })
        ])
        throw new HttpException("Usuário excluído com sucesso", HttpStatus.ACCEPTED)

    }

}
