import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCategoryDto {
    @IsString()
    @IsNotEmpty()
    categoryName: string;
}
