import { ApiProperty } from "@nestjs/swagger";

export class AuthResponseDTO {
    token:string;
    expiresIn:number;
    user: {
        id:string;
        email:string;
        name:string
    }
}

export class LoginDTO {
    @ApiProperty({
        example: "user@user.com",
        description: "Email do usuário"
    })
    email:string;

    @ApiProperty({
        example: "User1234",
        description: "Senha do usuário"
    })
    password:string;
}