import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseGuards(JwtAuthGuard)
  @Post('supabase')
  @UseInterceptors(FileInterceptor('file'))
  async uploadToSupabase(
    @User('sub') userDocumentNo: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.uploadService.uploadToSupabase(userDocumentNo, file);
  }
}
