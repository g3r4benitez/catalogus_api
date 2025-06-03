import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateArticuloDto } from './create-articulo.dto';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateArticuloDto extends PartialType(CreateArticuloDto) {
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

    @ApiProperty({ example: 50, description: 'Indica el precio del articulo' })
    @IsNumber()
    precio: number;

    @ApiProperty({ example: '10', description: 'Indica id de la categoria a la que pertenece el articulo' })
    @IsNumber()
    @IsNotEmpty()
    idCategoria: number;

}
