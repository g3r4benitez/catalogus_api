import { Categoria } from 'src/categorias/entities/categorias.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('articulo')
export class Articulo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column({ default: true})
    activo: boolean;

    @Column({ default: 0})
    precio: number;

    @ManyToOne(() => Categoria)
    @JoinColumn()
    categoria: Categoria;
   
}

