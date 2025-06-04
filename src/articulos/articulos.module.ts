import { Module } from '@nestjs/common';
import { ArticulosService } from './articulos.service';
import { ArticulosController } from './articulos.controller';
import { Articulo } from './entities/articulo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from 'src/categorias/categorias.module';

@Module({
  imports: [TypeOrmModule.forFeature([Articulo]), CategoriaModule],
  controllers: [ArticulosController],
  providers: [ArticulosService],
  exports: [TypeOrmModule.forFeature([Articulo])],
})
export class ArticulosModule {}
