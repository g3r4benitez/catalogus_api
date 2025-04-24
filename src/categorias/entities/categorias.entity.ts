import { Entity, PrimaryGeneratedColumn, Column  } from "typeorm";


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
   
}
