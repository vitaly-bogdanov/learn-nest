import slugify from 'slugify';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SlugifyService {
    toSlug(string: string): string {
        return slugify(string, {
            replacement: '-',
            lower: true,
            strict: false,
            locale: 'ru'
        });
    }
}