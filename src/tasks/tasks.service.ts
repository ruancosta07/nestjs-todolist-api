import { HttpException, HttpStatus, Inject, Injectable, NotFoundException, Scope, UnauthorizedException, } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDTO, } from './task.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class TasksService {
    constructor(@Inject(REQUEST) private readonly request: Request, private readonly jwtService: JwtService, private readonly configService: ConfigService, private readonly prisma: PrismaService) {

    }

    async getTodoById(id: string) {
        const foundTask = await this.prisma.todos.findUnique({ where: { id } })
        if (!foundTask) {
            throw new HttpException("Tarefa não encontrada", HttpStatus.NOT_FOUND)
        }
        return foundTask
    }

    async createTask(task: CreateTaskDTO) {
        const { authorization } = this.request.headers
        console.log(authorization)
        if (!authorization) {
            throw new UnauthorizedException()
        }
        const [, token] = authorization.split(" ")
        const decodedToken = this.jwtService.verify(token, {
            secret: this.configService.get("JWT_SECRET")
        }) as {
            sub: string;
            email: string,
            name: string
        }
        const foundUser = await this.prisma.users.findUnique({
            where: { id: decodedToken.sub }
        })
        const newTask = await this.prisma.todos.create({
            data: {
                description: task.description,
                name: task.name,
                status: task.status,
                userId: foundUser.id
            },
            
        })
        return {message: "Tarefa criada com sucesso", task:newTask}
    }

    async getTasksByUserId(id: string) {
        const [,token] = this.request.headers?.authorization?.split(" ")
        const decodedToken = this.jwtService.verify(token, {
            secret: this.configService.get("JWT_SECRET")
        }) as {
            sub:string;
            name:string;
            email:string;
        }
        const foundUser = await this.prisma.users.findUnique({
            where: {
                id:decodedToken.sub
            }
        })
        if(foundUser.id !== id){
            throw new UnauthorizedException()
        }
        const tasks = await this.prisma.todos.findMany({
            where: {
                userId: id
            }
        })
        return tasks
    }

    async deleteTask(id: string) {
        const foundTask = await this.prisma.todos.findUnique({
            where: {
                id
            }
        })
        if (!foundTask) {
            throw new NotFoundException()
        }
        await this.prisma.todos.delete({
            where: {
                id
            }
        })
        throw new HttpException("Tarefa excluída com sucesso", HttpStatus.ACCEPTED)
    }

    async editTask(id: string, data: CreateTaskDTO) {
        const foundTask = await this.prisma.todos.findUnique({
            where: {
                id
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
        const foundUser = await this.prisma.users.findUnique({
            where: {
                id:decodedToken.sub
            }
        })
        if (!foundTask) {
            throw new NotFoundException()
        }
        if(foundUser.id !== id){
            throw new UnauthorizedException()
        }
        const updatedTask = await this.prisma.todos.update({
            where: {
                id
            },
            data
        })
        return updatedTask
    }

}
