import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('venta')
export class Venta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;

  @Column({ default: 0 })
  total: number;
}

@Entity('detalle_venta')
export class DetalleVenta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ventaId: number;

  @Column()
  articuloId: number;

  @Column()
  cantidad: number;

  @Column()
  precio: number;
}
