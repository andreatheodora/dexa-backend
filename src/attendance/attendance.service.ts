import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AttendanceResponseDto } from './dto/attendance-response.dto';
import { FetchAttendanceDto } from './dto/fetch-attendance.dto';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  //Tap in
  async tapIn(user_document_no: string): Promise<AttendanceResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        u_document_no: user_document_no,
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

    if (existingAttendance) throw new ConflictException('Already tapped in');

    const newAttendance = await this.prisma.attendance.create({
      data: {
        a_document_no: randomUUID(),
        a_u_id: userId,
        a_year: date.getFullYear(),
        a_month: date.getMonth() + 1,
        a_date: date.getDate(),
        a_tap_in: date,
      },
      include: {
        user: true,
      },
    });

    return new AttendanceResponseDto(newAttendance);
  }

  //Tap out
  async tapOut(user_document_no: string): Promise<AttendanceResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: {
        u_document_no: user_document_no,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const date = new Date();

    const userId = user.u_id;

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
      throw new NotFoundException('User has not tapped in');

    if (existingAttendance.a_tap_out)
      throw new ConflictException('User already tapped out');

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
        a_tap_out: date,
      },
      include: {
        user: true,
      },
    });

    return new AttendanceResponseDto(updatedAttendance);
  }

  //Upload image
  async uploadImage() {}

  //Get attendance from all users
  //Allow filtering based on date
  //In batches of 15
  async fetchAttendance(
    filterDto: FetchAttendanceDto,
  ): Promise<AttendanceResponseDto[]> {
    const {
      year,
      month,
      date,
      user_document_no,
      page = 1,
      count = 15,
    } = filterDto;

    const whereClause: any = {};
    if (year) whereClause.a_year = year;
    if (month) whereClause.a_month = month;
    if (date) whereClause.a_date = date;

    if (user_document_no) {
      const user = await this.prisma.user.findUnique({
        where: {
          u_document_no: user_document_no,
        },
      });

      if (!user) throw new NotFoundException('User not found');

      whereClause.a_u_id = user.u_id;
    }

    const attendances = await this.prisma.attendance.findMany({
      where: whereClause,
      skip: (page - 1) * count,
      take: count,
      include: {
        user: true,
      },
    });

    return attendances.map(
      (attendance) => new AttendanceResponseDto(attendance),
    );
  }
}
