import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

export class UserDTO{
    @ApiHideProperty()
    id:string;
    @ApiProperty({
        example: "Jhon Doe"
    })
    name:string;
    @ApiProperty({
        example: "jhondoe@email.com"
    })
    email:string;
    @ApiProperty({
        example: "Jhon1234"
    })
    password:string
}