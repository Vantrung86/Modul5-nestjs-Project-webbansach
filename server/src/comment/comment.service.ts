import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment) private commentRepo:Repository<Comment>){}

  async create(createCommentDto: CreateCommentDto) {
    const data = this.commentRepo.create({...createCommentDto,userId:createCommentDto.userId as any,productId:createCommentDto.productId as any})
    await this.commentRepo.save(data)
    return 'Thêm thành công';
  }

  async findOne(id: number) {
    return await this.commentRepo.createQueryBuilder("comment")
    .leftJoinAndSelect("comment.userId","user")
    .leftJoinAndSelect("comment.productId","product")
    .where("comment.productId = :id", { id: id})
    .getMany()
  }



  
  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
