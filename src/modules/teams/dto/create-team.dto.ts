import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;
}

export class CreateTeamDto {
  @IsString()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  members: CreateUserDto[];
}
