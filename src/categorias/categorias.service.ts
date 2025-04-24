import { Injectable } from '@nestjs/common';
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

  create(createInternoDto: CategoriaDTO) {
    return this.categoriaRepository.save(createInternoDto);
  }

  findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }

  findOne(id: number): Promise<Categoria | null> {
    return this.categoriaRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.categoriaRepository.delete(id);
  }

  async update(id: number, updateInternoDto: CategoriaDTO) {
    return this.categoriaRepository.update(id, updateInternoDto);
  }
}
