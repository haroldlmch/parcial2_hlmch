import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProgramaDto } from './dto/create-programa.dto';
import { UpdateProgramaDto } from './dto/update-programa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Programa } from './entities/programa.entity';
import { Repository } from 'typeorm';
import { NivelesAcademico } from 'src/niveles_academicos/entities/niveles_academico.entity';

@Injectable()
export class ProgramasService {
  constructor(
    @InjectRepository(Programa)
    private programasRepository: Repository<Programa>,
  ) {}
  async create(createProgramaDto: CreateProgramaDto): Promise<Programa> {
    let programa = await this.programasRepository.findOneBy({
      idNivelAcademico: createProgramaDto.idNivelAcademico,
      nombre: createProgramaDto.nombre,
    });
    if (programa) throw new ConflictException('El programa ya existe');

    programa = new Programa();
    Object.assign(programa, createProgramaDto);
    return this.programasRepository.save(programa);
  }

  async findAll(areaConocimiento?: string): Promise<Programa[]> {
  const where: any = {};
  
  if (areaConocimiento) {
    where.areaConocimiento = areaConocimiento;
  }

  return this.programasRepository.find({
    where,
    relations: { nivelesacademico: true },
    select: {
      id: true,
      nombre: true,
      descripcion: true,
      version: true,
      duracionMeses: true,
      costo: true,
      fechaInicio: true,
      estado: true,
      areaConocimiento: true,
      nivelesacademico: { id: true, nombre: true },
    },
    order: { nombre: 'ASC' },
  });
}

  async findOne(id: number): Promise<Programa> {
    const programa = await this.programasRepository.findOne({
      where: { id },
      relations: { nivelesacademico: true },
    });
    if (!programa) throw new NotFoundException('El programa no existe');
    return programa;
  }

  async update(
    id: number,
    updateProgramaDto: UpdateProgramaDto,
  ): Promise<Programa> {
    const programa = await this.findOne(id);
    Object.assign(programa, updateProgramaDto);
    return this.programasRepository.save(programa);
  }

  async remove(id: number): Promise<Programa> {
    const programa = await this.findOne(id);
    return this.programasRepository.softRemove(programa);
  }
}
