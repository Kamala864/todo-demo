import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsDate } from 'class-validator';

export class TodoDto {
    @ApiProperty()
  @IsNotEmpty()
  @IsString()
  taskName: string;

@ApiProperty()
  @IsString()
  description: string;

@ApiProperty()
  @IsNotEmpty()
  @IsString()
  status: string;

@ApiProperty()
  @IsDate()
  createdAt: Date;
}
