import { HttpException, HttpStatus } from '@nestjs/common';

export const TrackFileFilter = (req, file, callback) => {
    if (file.fieldname === 'picture' && !file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(
        new HttpException(
          'Невалидный формат файла для поля image',
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    } 
    // else if ( file.fieldname === 'audio' && !file.originalname.match(/\.(mp3|midi)$/)) {
    //     return callback(
    //         new HttpException(
    //           'Невалидный файл для поля audio',
    //           HttpStatus.BAD_REQUEST,
    //         ),
    //         false,
    //     );
    // }
    callback(null, true);
};