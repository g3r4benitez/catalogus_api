import { Module } from '@nestjs/common';
import { CategoriaService } from './categorias.service';
import { CategoriaController } from './categorias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categorias.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  controllers: [CategoriaController],
  providers: [CategoriaService],
})
export class CategoriaModule {}
