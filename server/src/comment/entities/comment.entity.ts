import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Comment {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    comment: string;

    @Column({type:'int'})
    rating:number;

    @Column({type: 'varchar', length: 255})
    date:string;

    @ManyToOne(()=>User,(item)=>item.comment)
    @JoinColumn({name:"userId"})
    userId: User

    @ManyToOne(()=>Product,(item)=>item.comment)
    @JoinColumn({name:"productId"})
    productId: Product
}
