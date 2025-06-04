import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class ArticuloDTO {
  @ApiProperty({
    example: '13',
    description: 'Indica el ID del articulo vendido',
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    example: '100',
    description: 'la cantidad por unidad de articulos vendidos',
  })
  @IsNumber()
  @IsNotEmpty()
  cantidad: number;
}

export class CreateVentaDto {
  @ApiProperty({
    example: [{ id: 1, cantidad: 25 }],
    description: 'El listados de articulos de la venta',
  })
  @IsArray()
  @IsNotEmpty()
  articulos: ArticuloDTO[];
}
