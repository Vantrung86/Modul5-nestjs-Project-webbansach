import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('/api/v1/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  //them order
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  //lay order theo userId
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  //status huy
  @Patch(':id')
  update(@Param('id') id: string) {
    return this.orderService.statusCancel(+id);
  }

  //status duyet
  @Patch('/access/:id')
  updateStatus(@Param('id') id: string) {
    return this.orderService.statusAccess(+id);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

 






  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
