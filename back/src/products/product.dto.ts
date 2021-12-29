import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrUpdateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class ProductDto extends CreateOrUpdateProductDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
