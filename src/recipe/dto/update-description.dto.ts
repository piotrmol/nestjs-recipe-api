import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatedescriptionDto {
  @IsNotEmpty()
  @MinLength(50)
  @IsString()
  description: string;
}
