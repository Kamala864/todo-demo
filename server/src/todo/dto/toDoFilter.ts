import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsNumber, IsDate } from 'class-validator';

export class ToDoFilter {
@ApiProperty({ required: false, default: 10 })
  @IsNumber()
  take: number;
  

  @ApiProperty({ required: false, default: 0 })
  @IsNumber()
  skip: number;

}
