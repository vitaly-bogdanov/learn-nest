export class UploadTruckFilesDto {
    readonly audios?: Express.Multer.File[]
    readonly pictures?: Express.Multer.File[]
}