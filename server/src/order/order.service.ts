import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private orderRepo:Repository<Order>){}

  //them order
  async create(createOrderDto: any) {
    const {userId,totalOrderPay,dayOrder,nameOrder,address,name,SDT} = createOrderDto
    const data = this.orderRepo.create({user:userId as any,totalOrderPay,dayOrder,nameOrder,address,name,SDT})
    const newOrder = await this.orderRepo.save(data)
    return newOrder
  }

  //lay order theo userId
  async findOne(userId: number) {
    return await this.orderRepo.createQueryBuilder("order")
    .where("order.userId = :userId", {userId})
    .getMany()
  }

  //status huy
  async statusCancel(orderId:number){
    await this.orderRepo.createQueryBuilder().update(Order).set({
      status:"Huỷ",
    })
    .where("order.orderId = :orderId", {orderId})
    .execute()
    return 'Đã huỷ đơn'
  }

  //status duyet
  async statusAccess(orderId:number){
    await this.orderRepo.createQueryBuilder().update(Order).set({
      status:"Duyệt",
    })
    .where("order.orderId = :orderId", {orderId})
    .execute()
    return 'Đã duyệt đơn'
  }


  async findAll() {
    return await this.orderRepo.find()
    // return await this.orderRepo.createQueryBuilder("order")
    // .orderBy("order.dayOrder", "DESC").getMany()
  }


  // pageNumber: number, pageSize: number
  // const skip = (pageNumber - 1) * pageSize;
  // .createQueryBuilder('user')
  //       .skip(skip)
  //       .take(pageSize)
  //       .getMany();



  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
