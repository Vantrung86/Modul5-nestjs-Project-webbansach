import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(@InjectRepository(Cart) private cartRepo:Repository<Cart>){}

  //tao moi cart
  async create(userId:number,productId:number) {
    const data = this.cartRepo.create({userId:userId as any,productId:productId as any,quantity:1})
    await this.cartRepo.save(data)
    return 'Thêm cart thành công';
  }

  //kiem tra sp co trong cart
  async checkProductCart(userId:number,productId:number){
    return await this.cartRepo.createQueryBuilder("cart")
    .where("cart.productId = :productId", {productId})
    .andWhere("cart.userId = :userId", {userId})
    .getOne()
  }

  //update quantity
  async updateQuantity(userId:number,productId:number,quantity:number){
      await this.cartRepo.createQueryBuilder().update(Cart).set({
          quantity:quantity + 1,
      })
      .where("cart.productId = :productId", {productId})
      .andWhere("cart.userId = :userId", {userId})
      .execute()
      return 'Update quantity thành công'
  }

  //lay cart theo userId
  async findOne(userId: number) {
    return await this.cartRepo.createQueryBuilder("cart")
    .innerJoinAndSelect("cart.productId","product")
    .where("cart.userId = :userId", {userId})
    .getMany()
  }

  //xoa cart theo cartId
  async remove(cartId: number) {
    await this.cartRepo.createQueryBuilder()
    .delete()
    .from(Cart)
    .where("cartId = :id", { id: cartId })
    .execute()
    return `Xoá cart thành công`;
  }

  //xoa cart theo userId, xoa tat ca
  async deleteAll(userId: number) {
    await this.cartRepo.createQueryBuilder()
    .delete()
    .from(Cart)
    .where("userId = :id", { id: userId })
    .execute()
    return `Xoá cart thành công`;
  }

  //giam quantity
  async decreaseQuantity(cartId:number,quantity:number){
    await this.cartRepo.createQueryBuilder().update(Cart).set({
      quantity:quantity - 1,
    })
    .where("cart.cartId = :cartId", {cartId})
    .execute()
    return 'Giảm quantity thành công'
  }

  //tang quantity
  async increaseQuantity(cartId:number,quantity:number){
    await this.cartRepo.createQueryBuilder().update(Cart).set({
      quantity:quantity + 1,
    })
    .where("cart.cartId = :cartId", {cartId})
    .execute()
    return 'Tăng quantity thành công'
  }

}
