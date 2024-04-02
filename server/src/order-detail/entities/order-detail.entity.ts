import { Order } from "src/order/entities/order.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    orderDetailId: number;

    @Column({ type: 'int'})
    quantity:number;

    @ManyToOne(()=>Order,item=>item.order_detail)
    @JoinColumn({name:"orderId"})
    order:Order
    
    @ManyToOne(()=>Product,item=>item.order_detail)
    @JoinColumn({name:"productId"})
    product:Product
}
