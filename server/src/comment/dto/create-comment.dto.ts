import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateCommentDto {
    @IsString()
    @IsNotEmpty()
    comment:string;

    @IsNumber()
    @IsNotEmpty()
    rating:number;

    @IsString()
    @IsNotEmpty()
    date:string;

    @IsNumber()
    @IsNotEmpty()
    userId:number;

    @IsNumber()
    @IsNotEmpty()
    productId:number;
}
