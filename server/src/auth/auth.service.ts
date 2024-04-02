import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from "argon2"
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService{
    constructor(private userService: UserService,private jwtService:JwtService){}
    async signUp(user:CreateUserDto): Promise<any>{
        const check =await this.userService.getUserByEmail(user.email)
        if (check) {
            throw new HttpException("email đã tồn tại", HttpStatus.BAD_REQUEST)
        }
        const hastPassword = await argon2.hash(user.password)
        return this.userService.create({...user,password: hastPassword})
    }

    async signIn(user){
        const check =await this.userService.getUserByEmail(user.email)
        if (!check) {
            throw new HttpException('email không đúng', HttpStatus.BAD_REQUEST);
        }
        const checkPassword = await argon2.verify(check.password, user.password);
        if (!checkPassword) {
          throw new HttpException('Mật khẩu không đúng', HttpStatus.BAD_REQUEST);
        }
        const token= await this.jwtService.signAsync( {...check },{secret:"token"})
        return {
          message: 'Đăng nhập thành công',
          data: check,
          token:token
        };
    }
}