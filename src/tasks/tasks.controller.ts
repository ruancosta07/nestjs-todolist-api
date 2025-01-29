import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO, } from './task.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, } from '@nestjs/swagger';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {

    }

    @ApiBearerAuth()
    @ApiOperation({
        summary: "Cria uma tarefa associando ela ao usuário que a criou"
    })
    @ApiResponse({
        status: 201,
        description: "Cria uma tarefa normalmente",
        schema: {
            example: {
                message: "Tarefa criada com sucesso",
                task: {
                    id: "679a3d36de8a5d7678aaae9d",
                    name: "Tarefa de teste",
                    description: "Uma descrição de teste",
                    status: "Em andamento",
                    userId: "67999898591ad457bbd8ea61"
                }
            }
        }
    })
    @ApiResponse({
        status: 401,
        description: "Retorna um erro quando o Bearer Token não é enviado.",
        schema: {
            example: {
                message: "Unauthorized",
                statusCode: 401
            }
        }
    })
    @UseGuards(AuthGuard)
    @Post("create")
    createTask(@Body() task: CreateTaskDTO) {
        return this.tasksService.createTask(task)
    }

    @ApiBearerAuth()
    @ApiOperation({
        summary: "Retorna todas as tarefas de acordo com o id do usuário"
    })
    @ApiResponse({
        isArray: true,
        status: 200,
        schema: {
            example: [{
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
            }]
        }
    })
    @ApiResponse({
        status: 401,
        description: "Retorna um erro quando o Bearer Token não é enviado ou quando o usuário tentar acessar tarefas que não são suas.",
        schema: {
            example: {
                message: "Unauthorized",
                statusCode: 401
            }
        }
    })
    @UseGuards(AuthGuard)
    @Get("/user/:id")
    getTasksByUserId(@Param("id") id: string) {
        return this.tasksService.getTasksByUserId(id)
    }

    @ApiOperation({
        summary: "Retorna uma tarefa de acordo id dela",
        description: "Retorna apenas uma tarefa que esteja associada ao usuário logado"
    })
    @ApiParam({
        name: "id",
        example: "679a3d32de8a5d7678aaae9b",
        required: true,
        description: "Id da tarefa"
    })
    @ApiResponse({
        description: "Retorna uma tarefa normalmente",
        status: 200,
        schema: {
            example: {
                id: "679a3d36de8a5d7678aaae9d",
                name: "Estudar NestJS",
                description: "Estudar o NestJS",
                status: "Não iniciada",
                userId: "67999898591ad457bbd8ea61"
            }
        }
    })
    @ApiResponse({
        status: 401,
        description: "Retorna um erro quando o Bearer Token não é enviado ou quando o usuário tentar acessar uma tarefa que não é sua.",
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
    getTasksById(@Param("id") id: string) {
        return this.tasksService.getTodoById(id)
    }

    @ApiOperation({
        summary: "Exclui uma tarefa de acordo com o id dela"
    })
    @ApiResponse({
        description: "Retorna uma tarefa normalmente",
        status: 202,
        schema: {
            example: {
                message: "Tarefa excluída com sucesso",
                statusCode: 202
            }
        }
    })
    @ApiResponse({
        status: 401,
        description: "Retorna um erro quando o Bearer Token não é enviado ou quando o usuário tenta excluir uma tarefa que não é sua",
        schema: {
            example: {
                message: "Unauthorized",
                statusCode: 401
            }
        }
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete(":id")
    deleteTask(@Param("id") id: string) {
        return this.tasksService.deleteTask(id)
    }

    @ApiBearerAuth()
    @ApiOperation({
        summary: "Altera uma tarefa de acordo com o id dela"
    })
    @ApiResponse({
        status: 202,
        description: "Edita uma tarefa normalmente",
        schema: {
            example: {
                id: "679a3d36de8a5d7678aaae9d",
                name: "Estudar NestJS",
                description: "Estudar o NestJS",
                status: "Não iniciada",
                userId: "67999898591ad457bbd8ea61"
            }
        }
    })
    @ApiResponse({
        status: 401,
        description: "Retorna um erro quando o Bearer Token não é enviado ou o usuário tenta editar uma tarefa que não é sua",
        schema: {
            example: {
                message: "Unauthorized",
                statusCode: 401
            }
        }
    })
    @UseGuards(AuthGuard)
    @Put("edit/:id")
    editTask(@Param("id") id: string, @Body() task: CreateTaskDTO) {
        return this.tasksService.editTask(id, task)
    }

}
