import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    cartId:number;

    @Column({ type: 'int'})
    quantity:number;

    @ManyToOne(()=>User,(item)=>item.cart)
    @JoinColumn({name:"userId"})
    userId: User

    @ManyToOne(()=>Product,(item)=>item.cart)
    @JoinColumn({name:"productId"})
    productId: Product
}
