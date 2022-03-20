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
