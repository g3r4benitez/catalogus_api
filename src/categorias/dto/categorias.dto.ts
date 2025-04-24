import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CategoriaDTO {
  @ApiProperty({ example: 'Pinturas', description: 'Nombre de la categoría' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiPropertyOptional({ example: 'En esta categorias se van registrar productos de tipo pinturas, todos los tipos' })
  @IsString()
  descripcion: string;

  @ApiProperty({ example: true, description: 'Indica si la categoria esta activa o desactivada' })
  @IsBoolean()
  activo: boolean;
}
