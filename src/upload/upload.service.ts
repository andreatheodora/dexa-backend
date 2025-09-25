import { Injectable, NotFoundException } from '@nestjs/common';
import { supabase } from 'src/supabase.client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

  async uploadToSupabase(userDocNo: string, file: Express.Multer.File) {
    const bucket = process.env.SUPABASE_BUCKET!;

    const fileName = `${userDocNo}-${Date.now()}`;

    const { error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) throw new Error(error.message);

    await this.insertImagePathToDatabase(userDocNo, fileName);

    return {
      path: fileName,
    };
  }

  async insertImagePathToDatabase(userDocNo: string, imagePath: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        u_document_no: userDocNo,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const userId = user.u_id;

    const date = new Date();

    const existingAttendance = await this.prisma.attendance.findUnique({
      where: {
        a_u_id_a_year_a_month_a_date: {
          a_u_id: userId,
          a_year: date.getFullYear(),
          a_month: date.getMonth() + 1,
          a_date: date.getDate(),
        },
      },
    });

    if (!existingAttendance)
      throw new NotFoundException('User has to tap in first');

    const updatedAttendance = await this.prisma.attendance.update({
      where: {
        a_u_id_a_year_a_month_a_date: {
          a_u_id: userId,
          a_year: date.getFullYear(),
          a_month: date.getMonth() + 1,
          a_date: date.getDate(),
        },
      },
      data: {
        a_image_url: imagePath,
      },
    });
  }
}
