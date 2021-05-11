import { Module } from '@nestjs/common';
import { TrackModule } from './track/track.module';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { CommentModule } from './comment/comment.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

@Module({
  imports: [
    TrackModule,
    AlbumModule,
    ArtistModule,
    CommentModule,
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, '..', 'static') }) // добавили статику
  ]
})
export class AppModule {}