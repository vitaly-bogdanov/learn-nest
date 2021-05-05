import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { CommentModule } from './comment/comment.module';

@Module({
    imports: [TrackModule, AlbumModule, ArtistModule, CommentModule]
})
export class AppModule {};