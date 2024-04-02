import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from './auth.service';
import { CreateUserDto } from "src/user/dto/create-user.dto";

@Controller("api/v1/auth")
export class AuthController{
    constructor(private authService: AuthService){}

    @Post("/sign-up")
    async signUp(@Body() user: CreateUserDto,@Res() res){  
        const userCreate = await this.authService.signUp(user)
        return res.status(201).json({
            message:userCreate
        })
    }

    @Post("/sign-in")
    signIn(@Body() user){
        return this.authService.signIn(user)
       
    }
}