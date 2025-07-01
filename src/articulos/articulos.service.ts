import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { UpdateArticuloDto } from './dto/update-articulo.dto';
import { Articulo } from './entities/articulo.entity';
import { ILike, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from 'src/categorias/entities/categorias.entity';
import { CategoriaService } from 'src/categorias/categorias.service';

@Injectable()
export class ArticulosService {
  constructor(
      @InjectRepository(Articulo)
      private articuloRepository: Repository<Articulo>, 
      private readonly categoriaService: CategoriaService,
    ){}

  async create(createArticuloDto: CreateArticuloDto) {
    const categoria = await this.categoriaService.findOne(createArticuloDto.idCategoria);
    if (!categoria) {
      throw new BadRequestException(`Categoria con ID ${createArticuloDto.idCategoria} no encontrada`);
    }

    const articulo = new Articulo();
    articulo.categoria = categoria;
    articulo.nombre = createArticuloDto.nombre;
    articulo.descripcion = createArticuloDto.descripcion;
    articulo.activo = true;
    articulo.precio = createArticuloDto.precio;
    return await this.articuloRepository.save(articulo);
  }

  findAll() {
    return this.articuloRepository.find({ relations: ['categoria'] });
  }

  async find(patron: string) {
    return this.articuloRepository.find({
      where: { nombre: ILike(`%${patron}%`) },
    });
  }

  findOne(id: number) {
    return this.articuloRepository.findOne({ where: { id }, relations: ['categoria'] });
  }

  async update(
    id: number,
    updateArticuloDto: UpdateArticuloDto,
  ): Promise<Articulo> {
    const articulo = await this.articuloRepository.findOneBy({ id })

    if (updateArticuloDto.idCategoria) {
      const categoria = await this.categoriaService.findOne(
        updateArticuloDto.idCategoria,
      );
      if (!categoria) {
        throw new BadRequestException(
          `Categoria con ID ${updateArticuloDto.idCategoria} no encontrada`,
        );
      }
      articulo.categoria = categoria;
    }
    
    articulo.nombre = updateArticuloDto.nombre;
    articulo.descripcion = updateArticuloDto.descripcion;
    articulo.activo = updateArticuloDto.activo;
    articulo.precio = updateArticuloDto.precio;
    
    await this.articuloRepository.update(id, articulo)
    const updated = await this.articuloRepository.findOneBy({ id });

    if(!updated){
      throw new NotFoundException(`Articulo con id ${id} no encontrado`);
    }

    return updated;
  }

  async remove(id: number) {
    await this.articuloRepository.delete(id);
  }
}
