import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsMimeType } from 'class-validator';

export class CreateTrackDto {
    @IsNotEmpty({ message: 'Название трека не должно быть пустым' })
    name: string;
    
    album?: Prisma.AlbumCreateNestedOneWithoutTracksInput;
    artist?: Prisma.ArtistCreateNestedOneWithoutTracksInput
}