import { Cart } from "src/cart/entities/cart.entity";
import { Comment } from "src/comment/entities/comment.entity";
import { Order } from "src/order/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    userId: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    userName: string;

    @Column({type: 'varchar', length: 100, unique: true, nullable: false})
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    password: string;

    @Column({ type: 'tinyint', default: 0 })
    role: number;

    @Column({ type: 'varchar', length: 10, unique: true, nullable: false })
    phone: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    address: string;

    @Column({ type: 'tinyint',default: 0 })
    status: boolean;

    @OneToMany(()=>Order,item=>item.user)
    order:Order

    @OneToMany(()=>Comment,item=>item.userId)
    comment:Comment

    @OneToMany(()=>Cart,item=>item.userId)
    cart:Cart
}
