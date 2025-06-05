import { Injectable } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { DetalleVenta, Venta } from './entities/venta.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Articulo } from 'src/articulos/entities/articulo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VentasService {

  constructor(
    @InjectRepository(Venta)
    private ventaRepository: Repository<Venta>,
    @InjectRepository(DetalleVenta)
    private detalleVentaRepository: Repository<DetalleVenta>,
    @InjectRepository(Articulo)
    private articuloRepository: Repository<Articulo>,
  ) {}

  async create(createVentaDto: CreateVentaDto) {
    //1 crear una venta
    let total = 0;
    console.log('articulos', createVentaDto.articulos);
    await Promise.all(
      createVentaDto.articulos.map(async (articulo) => {
        const id = articulo.id;
        const articuloDB = await this.articuloRepository.findOneBy({ id });
        total = total + articuloDB.precio * articulo.cantidad;
        return total;
        //console.log('subtotal', articuloDB.precio * articulo.cantidad);
      }),
    );

    console.log('total', total);
    const ventaObj = {
      fecha: new Date(),
      total: total,
    };

    const venta = await this.ventaRepository.save(ventaObj);

    createVentaDto.articulos.map(async (articulo) => {
      const id = articulo.id;
      const articuloDB = await this.articuloRepository.findOneBy({ id });
      const detalleVentaObj = {
        ventaId: venta.id,
        articuloId: articulo.id,
        cantidad: articulo.cantidad,
        precio: articuloDB.precio,
      };
      this.detalleVentaRepository.save(detalleVentaObj);
    });
    return `Se ha creado la venta ${venta.id}`;
  }

  async findAll() {
    return await this.ventaRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} venta`;
  }

  update(id: number, updateVentaDto: UpdateVentaDto) {
    return `This action updates a #${id} venta`;
  }

  remove(id: number) {
    return `This action removes a #${id} venta`;
  }
}
