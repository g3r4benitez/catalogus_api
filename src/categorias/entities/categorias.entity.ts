import { Articulo } from "src/articulos/entities/articulo.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany  } from "typeorm";


@Entity('categoria')
export class Categoria {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column({ default: true})
    activo: boolean;

    @OneToMany(() => Articulo, articulo => articulo.categoria)
    articulos: Articulo[];
   
}
