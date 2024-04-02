import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderDetailService } from './order-detail.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';

@Controller('/api/v1/order-detail')
export class OrderDetailController {
  constructor(private readonly orderDetailService: OrderDetailService) {}

  //tao orderDetail
  @Post()
  async create(@Body() createOrderDetailDto: any) {
    const {orderId,dataCart} = createOrderDetailDto
    await Promise.all(
      dataCart.map(async (item:any) => {await this.orderDetailService.create(orderId, item.productId.productId, item.quantity)
                                       await this.orderDetailService.updateStocksProduct(item.productId.productId, item.quantity)}
      )
    )
  }

  //lay theo orderId
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderDetailService.findOne(+id);
  }

  @Patch(':id')
  async updateStock(@Param('id') id: string){
    const data = await this.orderDetailService.findOne(+id);
    await Promise.all(
      data.map(async (item:any) =>await this.orderDetailService.updateStock(item.product.productId, item.quantity)                               
      )
    )
  }
}
