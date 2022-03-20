import * as path from 'path';
import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { UploadMultipleFilesDto } from './dto/upload-multiple-files.dto';
import { UploadEntity } from './interfaces/upload-entity.interface';
import { getRandomString } from 'src/common/utils';

@Injectable()
export class FileService {
  constructor() {}

  uploadMultipleFiles(
    req: Request,
    dto: UploadMultipleFilesDto,
    images: Express.Multer.File[],
    docs: Express.Multer.File[],
  ) {
    const baseUrl = `${req.protocol}://${req.headers.host || ''}`;
    const imageEntities = this.uploadImages(baseUrl, dto, images);
    const docEntities = this.uploadDocs(baseUrl, dto, docs);
    return {
      images: imageEntities,
      docs: docEntities,
    };
  }

  private uploadImages(
    host: string,
    dto: UploadMultipleFilesDto,
    images: Express.Multer.File[],
  ): UploadEntity[] {
    // 检查静态文件目录是否存在
    const imageFolderPath = path.resolve(__dirname, '../static/images');
    const staticFolderExist = fs.existsSync(imageFolderPath);
    !staticFolderExist && fs.mkdirSync(imageFolderPath);

    return images.map<UploadEntity>((item) => {
      const ext = item.originalname.substring(
        item.originalname.lastIndexOf('.'),
      );
      const timestamp = Date.now();
      const fileName = `${timestamp}_${getRandomString(8)}${ext}`;
      fs.writeFileSync(path.resolve(imageFolderPath, fileName), item.buffer);

      return {
        url: `${host.replace(/\/$/, '')}/static/images/${fileName}`,
        fileName,
        type: 'image',
        timestamp,
        mimetype: item.mimetype,
        ext,
        uploader: {
          name: dto.uploader,
          email: dto.email,
        },
      };
    });
  }

  private uploadDocs(
    host: string,
    dto: UploadMultipleFilesDto,
    docs: Express.Multer.File[],
  ): UploadEntity[] {
    // 检查静态文件目录是否存在
    const docFolderPath = path.resolve(__dirname, '../static/docs');
    const staticFolderExist = fs.existsSync(docFolderPath);
    !staticFolderExist && fs.mkdirSync(docFolderPath);

    return docs.map<UploadEntity>((item) => {
      const ext = item.originalname.substring(
        item.originalname.lastIndexOf('.'),
      );
      const timestamp = Date.now();
      const fileName = `${timestamp}_${getRandomString(8)}${ext}`;
      fs.writeFileSync(path.resolve(docFolderPath, fileName), item.buffer);

      return {
        url: `${host.replace(/\/$/, '')}/static/docs/${fileName}`,
        fileName,
        type: 'doc',
        timestamp,
        mimetype: item.mimetype,
        ext,
        uploader: {
          name: dto.uploader,
          email: dto.email,
        },
      };
    });
  }
}
