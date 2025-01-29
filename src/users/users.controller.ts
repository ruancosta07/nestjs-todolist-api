import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from './users.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {

    }

    @ApiOperation({
        summary: "Retorna os dados de um usuário de acordo com o id"
    })
    @ApiParam({
        name: "id",
        required: true,
        example: "679a3e9afc18ecca76dad60b",
    })
    @ApiResponse({
        status: 200,
        description: "Retorna o usuário",
        schema: {
            example: {
                "id": "679a3e9afc18ecca76dad60b",
                "name": "User",
                "email": "user@user.com",
                todos: [
                    {
                        id: "679a3d36de8a5d7678aaae9d",
                        name: "Estudar NestJS",
                        description: "Estudar o NestJS",
                        status: "Não iniciada",
                        userId: "67999898591ad457bbd8ea61"
                    },
                    {
                        id: "679a3d36de8a5d7678aaae9d",
                        name: "Estudar NestJS",
                        description: "Estudar o NestJS",
                        status: "Não iniciada",
                        userId: "67999898591ad457bbd8ea61"
                    },
                ]
            }
        }
    })
    @ApiResponse({
        status: 401,
        description: "Retorna um erro quando o Bearer Token não é enviado ou quando usuário tenta acessar os dados de outro usuário",
        schema: {
            example: {
                message: "Unauthorized",
                statusCode: 401
            }
        }
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get(":id")
    getUser(@Param("id") id: string) {
        return this.usersService.getUser(id)
    }

    @ApiOperation({
        summary: "Cria um usuário no banco de dados"
    })

    @ApiResponse({
        status: 201,
        schema: {
            example: {
                message: "Usuário criado com sucesso",
                id: "679a5a8a46f5d5d500a0dddd",
                name: "Jhon Doe",
                email: "jhondoe@jhon.com",
            }
        },

    })

    @Post("create")
    create(@Body() user: UserDTO) {
        return this.usersService.createUser(user)
    }
    @ApiBearerAuth()
    @ApiOperation({
        summary: "Edita um usuário de acordo com o id"
    })

    @ApiResponse({
        status: 202,
        schema: {
            example: {
                "statusCode": 202,
                "message": "Usuário alterado com sucesso"
            }
        }
    })
    @ApiResponse({
        status: 401,
        description: "Retorna um erro quando o Bearer Token não é enviado ou quando o usuário tenta alterar os dados de outro usuário",
        schema: {
            example: {
                message: "Unauthorized",
                statusCode: 401
            }
        }
    })
    @UseGuards(AuthGuard)
    @Put("/edit/:id")
    edit(@Param("id") id: string, @Body() user: UserDTO) {
        return this.usersService.editUser(id, user)
    }
    @ApiResponse({
        status: 202,
        schema: {
            example: {
                "statusCode": 202,
                "message": "Usuário excluído com sucesso"
            }
        }
    })
    @ApiResponse({
        status: 401,
        description: "Retorna um erro quando o Bearer Token não é enviado ou quando o usuário tenta excluir uma conta de outro usuário",
        schema: {
            example: {
                message: "Unauthorized",
                statusCode: 401
            }
        }
    })
    @ApiOperation({
        summary: "Exclui um usuário de acordo com o id"
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete("/delete/:id")
    delete(@Param("id") id: string) {
        return this.usersService.deleteUser(id)
    }
}
