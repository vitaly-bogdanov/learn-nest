import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateTrackDto {
    @IsNotEmpty({ message: 'Название трека не должно быть пустым' })
    readonly name: string;

    @IsNumberString({ no_symbols: true }, { message: 'Невалидное значение albumId' })
    readonly albumId?: number;

    @IsNumberString({ no_symbols: true }, { message: 'Невалидное значение artistId' })
    readonly artistId?: number;
}