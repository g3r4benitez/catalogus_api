import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { UpdateArticuloDto } from './dto/update-articulo.dto';
import { Articulo } from './entities/articulo.entity';
import { Repository } from 'typeorm';
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
    return this.articuloRepository.save(createArticuloDto);
  }

  findAll() {
    return this.articuloRepository.find({ relations: ['categoria'] });
  }

  findOne(id: number) {
    return this.articuloRepository.findOne({ where: { id }, relations: ['categoria'] });
  }

  async update(id: number, updateArticuloDto: UpdateArticuloDto): Promise<Articulo> {
    await this.articuloRepository.update(id, updateArticuloDto);
    const updated = await this.articuloRepository.findOneBy({ id });

    if(!updated){
      throw new NotFoundException(`Articulo con id ${id} no encontrado`);
    }

    return updated;
  }

  remove(id: number) {
    return `This action removes a #${id} articulo`;
  }
}
