import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateProductDto  {
    @IsString()
    @IsNotEmpty()
    productName:string;

    @IsString()
    @IsNotEmpty()
    src:string;

    @IsNumber()
    @IsNotEmpty()
    price:number;

    @IsString()
    @IsNotEmpty()
    author:string;

    @IsNumber()
    @IsNotEmpty()
    stock:number;

    @IsNumber()
    categoryId:number

}
