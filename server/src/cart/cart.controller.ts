import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('/api/v1/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(":id")
  async create(@Body() createCartDto: any,@Param('id') id:number ) {
    try {
      const {productId} = createCartDto
      const check =await this.cartService.checkProductCart(id,productId)
      if (!check) {
        return this.cartService.create(id,productId)
      }
      return this.cartService.updateQuantity(id,productId,check.quantity);
    } catch (error) {
      console.log(error);
    }
  }

  //lay cart theo userId
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }
  
  //xoa cart theo cartId
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }

  //xoa cart theo userId,xoa tat ca
  @Delete('/all/:id')
  deleteCartUser(@Param('id') id: string) {
    return this.cartService.deleteAll(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: any) {
    const {quantity,type} = updateCartDto
    if (type === "giam") {
      return this.cartService.decreaseQuantity(+id,quantity)
    }else{
      return this.cartService.increaseQuantity(+id,quantity)
    }
  }

}
