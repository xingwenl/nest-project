import { UploadService } from './upload.service';
import { JwtAuth } from './../../../common/decorator/jwt-auth.decorator';
import { Controller, Post, UseInterceptors, UploadedFile, Req, Get, Query } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor, } from "@nestjs/platform-express";

@Controller('upload')
export class UploadController {

    constructor(
        private readonly uploadService: UploadService
    ){}

    @Post()
    @JwtAuth()
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file, @Req() req: any) {
        return this.uploadService.uploadRecords(req.user.id, file)
    }

    @Get()
    @JwtAuth()
    records(@Query('page') page: number, @Query('size') size: number) {
        return this.uploadService.getRecords(page, size)
    }
}