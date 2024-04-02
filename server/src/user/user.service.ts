import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo:Repository<User>){}

  async create(createUserDto: CreateUserDto) {
    await this.userRepo
      .createQueryBuilder('users')
      .insert()
      .into(User)
      .values(createUserDto)
      .execute();
    return 'Thêm thành công';
  }

  async findAll() {
    return await this.userRepo.find()
  }

  async getUserByEmail(email: string) {
    return await this.userRepo.findOne({
      where: {
        email,
      },
    });
  }


  async patchStatus(userId:number,status:boolean){
    await this.userRepo.createQueryBuilder().update(User).set({
      status:!status,
    })
    .where("user.userId = :userId", {userId})
    .execute()
    return 'Cập nhật status thành công'
  }

  getUserById(id: number) {
    return `This action returns a #${id} user`;
  }

}
