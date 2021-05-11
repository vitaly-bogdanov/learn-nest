export class UploadTruckFilesDto {
    readonly audio?: Express.Multer.File[]
    readonly picture?: Express.Multer.File[]
}