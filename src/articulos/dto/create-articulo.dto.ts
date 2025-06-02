import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Categoria } from "src/categorias/entities/categorias.entity";

export class CreateArticuloDto {
  @ApiProperty({ example: 'Pintura blanca de litro', description: 'nombre del articulo' })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiPropertyOptional({ example: 'Se trata de una pintura latex presentacion litro' })
  @IsString()
  descripcion: string;

  @ApiProperty({ example: true, description: 'Indica si la categoria esta activa o desactivada' })
  @IsBoolean()
  activo: boolean;

  @ApiProperty({ example: '100', description: 'Indica el precio del articulo' })
  @IsNumber()
  @IsNotEmpty()
  precio: number;

  @ApiProperty({ example: '10', description: 'Indica id de la categoria a la que pertenece el articulo' })
  @IsNumber()
  @IsNotEmpty()
  idCategoria: number;


}
