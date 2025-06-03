import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticulosService } from './articulos.service';
import { CreateArticuloDto } from './dto/create-articulo.dto';
import { UpdateArticuloDto } from './dto/update-articulo.dto';
import { ApiBody } from '@nestjs/swagger';
import { FindPatronDTO } from './dto/find-patron.dto';

@Controller('articulos')
export class ArticulosController {
  constructor(private readonly articulosService: ArticulosService) {}

  @Post()
  @ApiBody({ type: CreateArticuloDto })
  create(@Body() createArticuloDto: CreateArticuloDto) {
    return this.articulosService.create(createArticuloDto);
  }

  @Get()
  findAll() {
    return this.articulosService.findAll();
  }

  @Post('/find')
  @ApiBody({ type: FindPatronDTO })
  find(@Body() body: FindPatronDTO) {
    return this.articulosService.find(body.patron);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articulosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateArticuloDto: UpdateArticuloDto,
  ) {
    return this.articulosService.update(+id, updateArticuloDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articulosService.remove(+id);
  }
}
