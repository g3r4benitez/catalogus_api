import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoriaDTO } from './dto/categorias.dto';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categorias.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriaService {

  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>
  ){}

  async create(createInternoDto: CategoriaDTO): Promise<Categoria> {
    return await this.categoriaRepository.save(createInternoDto);
  }

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find();
  }

  async findOne(id: number): Promise<Categoria | null> {
    return await this.categoriaRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.categoriaRepository.delete(id);
  }

  async update(id: number, updateInternoDto: CategoriaDTO) {
    await this.categoriaRepository.update(id, updateInternoDto);
    const updated = await this.categoriaRepository.findOneBy({ id });
    if(!updated){
      throw new NotFoundException(`La categoria con id ${id} no encontrado`);
    }

    return updated;
  }
}
