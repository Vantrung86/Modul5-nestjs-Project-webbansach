import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {
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
    @Min(0)
    stock:number;

    @IsNumber()
    categoryId:number
}
