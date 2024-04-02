import { Injectable } from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { OrderDetail } from './entities/order-detail.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class OrderDetailService {
  constructor(@InjectRepository(OrderDetail) private orderDetailRepo:Repository<OrderDetail>,
              @InjectRepository(Product) private productRepo:Repository<Product>
             ){}

  //tao orderDetail
  async create(orderId:number,productId:number,quantity:number) {
    const obj={
      order:orderId as any,
      product:productId as any,
      quantity:quantity
    }
    const data = this.orderDetailRepo.create(obj)
    await this.orderDetailRepo.save(data)
    return 'them thanh cong';
  }

  //lay theo orderId
  async findOne(orderId: number) {
    return await this.orderDetailRepo.createQueryBuilder("order_detail")
    .innerJoinAndSelect("order_detail.product","product")
    .where("order_detail.orderId = :orderId", {orderId})
    .getMany()
  }

  //trừ stock trong product
  async updateStocksProduct(productId:number,quantity:number){
    await this.productRepo.createQueryBuilder().update(Product).set({
      stock: () => 'stock - ' + quantity 
    })
    .where("product.productId = :productId", {productId})
    .execute()
  }

   //cộng stock trong product
   async updateStock(productId:number,quantity:number){
    await this.productRepo.createQueryBuilder().update(Product).set({
      stock: () => 'stock + ' + quantity 
    })
    .where("product.productId = :productId", {productId})
    .execute()
  }

}
