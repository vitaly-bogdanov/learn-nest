import { Prisma } from '@prisma/client';
import { IsNumberString } from 'class-validator';

export class UpdateTrackDto {
    
    readonly name?: string;

    @IsNumberString({ no_symbols: true }, { message: 'Невалидное значение albumId' })
    readonly albumId?: Prisma.AlbumCreateNestedOneWithoutTracksInput;

    @IsNumberString({ no_symbols: true }, { message: 'Невалидное значение artistId' })
    readonly artistId?: Prisma.ArtistCreateNestedOneWithoutTracksInput;
}