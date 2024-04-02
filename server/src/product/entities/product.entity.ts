import { Cart } from "src/cart/entities/cart.entity";
import { Category } from "src/category/entities/category.entity";
import { Comment } from "src/comment/entities/comment.entity";
import { OrderDetail } from "src/order-detail/entities/order-detail.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Product {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    productId: number;

    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    productName: string;

    @Column({ type: 'longtext', nullable: false })
    src: string;

    @Column({ type: 'decimal', precision: 10, scale: 0 })
    price: number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    author: string;

    @Column({ type: 'int'})
    stock:number

    @ManyToOne(()=>Category,(item)=>item.product, { nullable: true })
    @JoinColumn({name:"categoryId"})
    categories: Category

    @OneToMany(()=>OrderDetail,item=>item.product)
    order_detail:OrderDetail

    @OneToMany(()=>Comment,item=>item.productId)
    comment:Comment

    @OneToMany(()=>Cart,item=>item.productId)
    cart:Cart
}
