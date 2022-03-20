import {
  Controller,
  Put,
  Req,
  Res,
  UseInterceptors,
  UploadedFiles,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { UploadMultipleFilesDto } from './dto/upload-multiple-files.dto';
import { FileService } from './file.service';
import { ResponseBody } from './models/response.model';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  /**
   * 多文件上传接口示例
   *
   * 请求需要设置 Content-Type
   * 'Content-Type': 'multipart/form-data'
   *
   * 表单示例
   * ```txt
   * uploader: "tom"
   * email: "tom@gmail.com"
   * images: File[]
   * doc: File[]
   * ```
   */
  @Put('/multiple-files')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'images', maxCount: 5 },
      { name: 'docs', maxCount: 5 },
    ]),
  )
  async uploadMultipleFiles(
    @Body() body: UploadMultipleFilesDto,
    @UploadedFiles()
    files: {
      images?: Express.Multer.File[];
      docs?: Express.Multer.File[];
    },
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const imageFiles = files.images ?? [];
    const docFiles = files.docs ?? [];

    if (!imageFiles.length && !docFiles.length) {
      return res.json(new ResponseBody(1, null, 'files is null'));
    }

    const record = this.fileService.uploadMultipleFiles(
      req,
      body,
      imageFiles,
      docFiles,
    );

    return res.json(new ResponseBody(0, record, 'success'));
  }
}
