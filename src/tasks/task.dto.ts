import { ApiProperty } from "@nestjs/swagger"
export class TaskDTO {
    id?: string
    @ApiProperty()
    name: string
    @ApiProperty()
    status: string
    @ApiProperty()
    description: string
    @ApiProperty({
        description: "Id do usuário que está criando a tarefa para associar a tarefa ao usuário",
        default: "67999898591ad457bbd8ea61"
    })
    userId: string
}

export class CreateTaskDTO {
    id?: string
    @ApiProperty({
        description: "Nome da tarefa que vai ser criada",
        example: "Tarefa de teste"
    })
    name: string
    
    @ApiProperty({
        description: "Status da tarefa que vai ser criada",
        example: "Em andamento"
    })
    status: string

    @ApiProperty({
        description: "Descrição da tarefa que vai ser criada",
        example: "Uma descrição de teste"
    })
    description: string

    // @ApiProperty({
    //     description: "Id do usuário que está criando a tarefa para associar a tarefa ao usuário",
    //     default: "67999898591ad457bbd8ea61"
    // })
    // userId: string
}