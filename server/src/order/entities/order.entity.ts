import { OrderDetail } from "src/order-detail/entities/order-detail.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
enum Status{
    a="Đang chờ",
    b="Duyệt",
    c="Huỷ"
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    orderId: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    dayOrder: string;

    @Column({ type: 'enum', enum:Status,default:Status.a })
    status: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    address: string;

    @Column({ type: 'decimal', precision: 10, scale: 0 })
    totalOrderPay: number;

    @Column({ type: 'varchar', length: 50 })
    nameOrder: string;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'varchar', length: 10, unique: true, nullable: false })
    SDT: string;

    @OneToMany(()=>OrderDetail,item=>item.order)
    order_detail:OrderDetail

    @ManyToOne(()=>User,item=>item.order)
    @JoinColumn({name:"userId"})
    user:User
}
