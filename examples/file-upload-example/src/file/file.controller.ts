import {
  Controller,
  Put,
  Req,
  Res,
  UseInterceptors,
  UploadedFiles,
  Body,
  UploadedFile,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { UploadMultipleFilesDto } from './dto/upload-multiple-files.dto';
import { FileService } from './file.service';
import { ResponseBody } from './models/response.model';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  /**
   * 单文件上传接口
   *
   * 接收文件的字段名为 myFile
   */
  @Put('/single-file-upload')
  @UseInterceptors(FileInterceptor('myFile'))
  uploadSingleFile(
    @UploadedFile() myFile: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const fileInfo = this.fileService.uploadFile(req, myFile);
    return res.json(new ResponseBody(0, fileInfo, 'success'));
  }

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
   * docs: File[]
   * ```
   */
  @Put('/multiple-files-upload')
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
