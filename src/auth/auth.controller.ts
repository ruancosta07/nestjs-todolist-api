import { Body, Controller, Post } from '@nestjs/common';
import { AuthResponseDTO, LoginDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService:AuthService){

    }
    @Post("login")
    @ApiOperation({
        summary: "Faz o login e retorna um token JWT junto com o tempo de expiração."
    })
    @ApiResponse({
        status: 200,
        description: "Login bem sucedido",
        schema: {
            example: {
                "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzlhM2U5YWZjMThlY2NhNzZkYWQ2MGIiLCJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJuYW1lIjoiVXNlciIsImlhdCI6MTczODE3MzYwMywiZXhwIjoxNzM4MTc3MjAzfQ.p4gnxfo68oNqhFG2r8nSBt4mhIRocGF2Zgz25ksgcVPE0ww-3tqaTs4QbJDFYBL2fWzBwNQH5s5vFBhBLjBZtA",
                "expiresIn": 3600,
                "user": {
                    "id": "679a3e9afc18ecca76dad60b",
                    "name": "User",
                    "email": "user@user.com"
                }
            }
        }
    })
    @ApiResponse({
        status: 401,
        description: "Retorna um erro quando o usuário não existe ou está com a senha incorreta.",
        schema: {
            example: {
                message: "Unauthorized",
                statusCode: 401
            }
        }
    })
    signIn(@Body() user:LoginDTO):Promise<AuthResponseDTO>{
        return this.authService.signIn(user)
    }
    // @Post("verify")
    
}
