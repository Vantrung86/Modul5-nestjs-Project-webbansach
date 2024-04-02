import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    categoryId: number;

    @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
    categoryName: string;

    @OneToMany(()=>Product,(item)=>item.categories)
    product:Product

    
}
