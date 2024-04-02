import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private productRepo: Repository<Product>){}

  async create(createProductDto: CreateProductDto) {
    const {productName,src,price,author,stock,categoryId} = createProductDto
    const data = await this.productRepo.createQueryBuilder()
    .insert()
    .into(Product)
    .values({
      productName:productName,
      src:src,
      price:price,
      author:author,
      stock:stock,
      categories:categoryId as any
    })
    .execute()
    return 'Thêm thành công';
  }

  async findAll() {
      // return this.productRepo.find()

      // return this.productRepo.find({
      //   relations: {
      //     categories: true
      //   }
      // })

    return await this.productRepo.createQueryBuilder("product")
    .innerJoinAndSelect("product.categories", "category")
    .getMany();
  }

  // orderBy("category.categoryId", "ASC")

  async findOne(productId: number): Promise<Product | null> {
    return await this.productRepo.createQueryBuilder("product")
    .innerJoinAndSelect("product.categories", "category")
    .where("product.productId = :id", { id: productId})
    .getOne()
  }

  async searchProductName(name:string){
    return this.productRepo.createQueryBuilder("product")
    .innerJoinAndSelect("product.categories", "category")
    .where("product.productName LIKE :productName", { productName: `%${name}%` })
    .getMany();
  }

  async update(productId: number, updateProductDto: UpdateProductDto) {
    const {productName,src,price,author,stock,categoryId} = updateProductDto
    await this.productRepo.update(productId,{productName,src,price,author,stock,categories:categoryId as any})

    // this.productRepo.createQueryBuilder().update(Product).set({
    //   productName: productName,
    //   src:src,
    //   price:price,
    //   author:author,
    //   stock:stock,
    //   categories:categoryId as any
    // })
    return `Cập nhật thành công`;
  }

  async remove(id: number) {
    await this.productRepo.delete(id)
    return `Xoá thành công`;
  }

  //Phan trang
  // async panaPage(obj:any){
  //   const {pageNumber, pageSize} = obj
  //   const skip = (pageNumber - 1) * pageSize
  //   return await this.productRepo.createQueryBuilder("product")
  //   .innerJoinAndSelect("product.categories", "category")
  //   .skip(skip)
  //   .take(pageSize)
  //   .getMany();
  // }


  // pageNumber: number, pageSize: number
  // const skip = (pageNumber - 1) * pageSize;
  // .createQueryBuilder('user')
  // .skip(skip)
  // .take(pageSize)
  // .getMany();


  //Lay product trong khoang
  // .where("product.price BETWEEN :minPrice AND :maxPrice", { minPrice, maxPrice })
}
