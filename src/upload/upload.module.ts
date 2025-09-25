import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService, PrismaService],
  exports: [UploadService], // in case you want to use it elsewhere
})
export class UploadModule {}
