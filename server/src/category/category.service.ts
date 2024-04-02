import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

  constructor(@InjectRepository(Category) private categoryRepo:Repository<Category>){}

  async create(createCategoryDto: CreateCategoryDto) {
    const data = this.categoryRepo.create(createCategoryDto)
    await this.categoryRepo.save(data)
    return 'Thêm thành công';
  }

  async findAll() {
    return await this.categoryRepo.createQueryBuilder("category").orderBy("category.categoryId", "ASC").getMany()
  }

  async findByName(name:string){
    return await this.categoryRepo.createQueryBuilder("category")
    .where("category.categoryName LIKE :categoryName", { categoryName: `%${name}%` })
    .getMany();
  }

  async update(categoryId: number, updateCategoryDto: UpdateCategoryDto) {
    const {categoryName} = updateCategoryDto
    await this.categoryRepo.update(categoryId,{categoryName:categoryName})
    return `Cập nhật thành công`;
  }

  async remove(categoryId: number) {
    await this.categoryRepo.delete(categoryId)
    return `Xoá thành công`;
  }
}
