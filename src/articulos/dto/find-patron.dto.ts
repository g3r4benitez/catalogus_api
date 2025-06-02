import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindPatronDTO {
  @ApiProperty({
    example: 'Pintura blanca de litro',
    description: 'Escribir el articulo a buscar',
  })
@IsString()
@IsNotEmpty()
  patron: string;

}