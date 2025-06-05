import { Module } from '@nestjs/common';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { ArticulosModule } from 'src/articulos/articulos.module';
import { Venta, DetalleVenta } from './entities/venta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Venta, DetalleVenta]), ArticulosModule],
  controllers: [VentasController],
  providers: [VentasService],
})
export class VentasModule {}
