import { Controller, Delete, Get, Param, Body, Post, Put } from '@nestjs/common';
import { TrackService } from './track.service';
import { Track, Prisma } from '@prisma/client';

@Controller('/tracks')
export class TrackController {
    constructor(private trackService: TrackService) {}

    @Post()    
    create(@Body() trackData: Prisma.TrackCreateInput): Promise<Track> {
        return this.trackService.create(trackData)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: Prisma.TrackUpdateInput): Promise<Track> {
        return this.trackService.update({ data, where: { id: Number(id) } })
    }

    @Get()
    getAll(): Promise<Track[]> {
        return this.trackService.getAll();
    }

    @Get(':id')
    getTrackById(@Param('id') id: string): Promise<Track> {
        return this.trackService.getOne({ id: Number(id) });
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<Track> {
        return this.trackService.delete({ id: Number(id) })
    }
}