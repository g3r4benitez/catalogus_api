import { PartialType } from '@nestjs/mapped-types';
import { CategoriaDTO } from './categorias.dto';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateCategoriaDto extends PartialType(CategoriaDTO) {
    @IsString()
    nombre: string;
    
    @IsString()
    descripcion: string;
    
    @IsBoolean()
    activo: boolean;

}
