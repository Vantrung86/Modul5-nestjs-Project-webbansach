import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { CartModule } from './cart/cart.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product/entities/product.entity';
import { User } from './user/entities/user.entity';
import { Category } from './category/entities/category.entity';
import { Order } from './order/entities/order.entity';
import { OrderDetail } from './order-detail/entities/order-detail.entity';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/entities/comment.entity';
import { Cart } from './cart/entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:"mysql",
    host:"localhost",
    port:3306,
    username:"root",
    password:"",
    database:"project-nest",
    entities:[Product,User,Category,Order,OrderDetail,Comment,Cart],
    synchronize:true
  }),ProductModule, UserModule, CategoryModule, OrderModule, OrderDetailModule, CartModule, AuthModule, CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
