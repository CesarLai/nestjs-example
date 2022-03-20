# file-upload-example

NestJS 文件上传示例。

## 静态文件服务配置

```typescript
import * as path from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    FileModule,
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
      serveRoot: '/static',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

配置完成后，静态文件服务的地址为 `http://localhost:3000/static`

（HTTP 服务使用 Nest 默认配置）

## 单文件上传

控制器定义

```typescript
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
}
```

使用 Postman 请求

![upload single file by Postman](./docs/images/postman-upload-single-file.png)

## 多文件上传

控制器定义

````typescript
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
````

使用 Postman 请求

![upload multiple files by Postman](./docs/images/postman-upload-multiple-files.png)
