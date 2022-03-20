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

  uploadFile(req: Request, file: Express.Multer.File, folder: string = '') {
    // 检查静态文件目录是否存在
    const folderPath = path.resolve(__dirname, '../static/', folder);
    const staticFolderExist = fs.existsSync(folderPath);
    !staticFolderExist && fs.mkdirSync(folderPath);

    const baseUrl = `${req.protocol}://${req.headers.host || ''}`;
    const ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
    const timestamp = Date.now();
    const fileName = `${timestamp}_${getRandomString(8)}${ext}`;
    fs.writeFileSync(path.resolve(folderPath, fileName), file.buffer);

    const staticRoot = path.resolve(__dirname, '../static');
    const relativePath = path.relative(
      staticRoot,
      path.resolve(staticRoot, folder, fileName),
    );
    const staticFileUrl = `${baseUrl}/static/${relativePath}`;

    return {
      fileName,
      timestamp,
      ext,
      staticFileUrl,
    };
  }

  uploadMultipleFiles(
    req: Request,
    dto: UploadMultipleFilesDto,
    images: Express.Multer.File[],
    docs: Express.Multer.File[],
  ) {
    const imageEntities = this.uploadImages(req, dto, images);
    const docEntities = this.uploadDocs(req, dto, docs);
    return {
      images: imageEntities,
      docs: docEntities,
    };
  }

  private uploadImages(
    req: Request,
    dto: UploadMultipleFilesDto,
    images: Express.Multer.File[],
  ): UploadEntity[] {
    return images.map<UploadEntity>((item) => {
      const { ext, timestamp, fileName, staticFileUrl } = this.uploadFile(
        req,
        item,
        'images',
      );

      return {
        url: staticFileUrl,
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
    req: Request,
    dto: UploadMultipleFilesDto,
    docs: Express.Multer.File[],
  ): UploadEntity[] {
    return docs.map<UploadEntity>((item) => {
      const { ext, timestamp, fileName, staticFileUrl } = this.uploadFile(
        req,
        item,
        'docs',
      );

      return {
        url: staticFileUrl,
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
