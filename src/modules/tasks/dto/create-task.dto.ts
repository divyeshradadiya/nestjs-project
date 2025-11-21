import { IsString, IsDateString, IsOptional, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  description: string;

  @IsDateString()
  dueDate: string;

  @IsOptional()
  @IsNumber()
  assigneeId?: number;
}
