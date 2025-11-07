import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsDecimal,
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';


export class CreateProgramaDto {
  @ApiProperty()
  @IsDefined({ message: 'El id_Nivel_Academico debe estar definido' })
  @IsInt({ message: 'El id_Nivel_Academico debe ser un número entero' })
  readonly idNivelAcademico: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El nombre no debe estar vacío' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MaxLength(100, { message: 'El nombre no debe exceder los 100 caracteres' })
  @Transform(({ value }): string | undefined =>
    typeof value === 'string' ? value.trim() : value,
  )
  readonly nombre: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'La descripción no debe estar vacía' })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MaxLength(2000, {
    message: 'La descripción no debe exceder los 2000 caracteres',
  })
  readonly descripcion: string;

  @ApiProperty()
  @IsDefined({ message: 'La versión debe estar definida' })
  @IsInt({ message: 'La versión debe ser un número entero' })
  readonly version: number;

  @ApiProperty()
  @IsDefined({ message: 'La duración en meses debe estar definida' })
  @IsInt({ message: 'La duración en meses debe ser un número entero' })
  readonly duracionMeses: number;

  @ApiProperty()
  @IsDefined({ message: 'El costo debe estar definido' })
  @Transform(({ value}) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(num)) throw new Error('Costo invalido');
    return num;
  })
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false}, { message: 'El costo debe ser un número decimal' })
  readonly costo: number;

  @ApiProperty()
  @IsDefined({ message: 'La fecha de inicio debe estar definida' })
  @IsDateString({}, { message: 'La fecha de inicio debe ser una fecha valida' })
  readonly fechaInicio: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'El estado no debe estar vacío' })
  readonly estado: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El área de conocimiento no debe estar vacío' })
  readonly areaConocimiento: string;

}

