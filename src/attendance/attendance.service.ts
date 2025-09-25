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
      u_document_no: user_document_no,
    });

    if (!user) throw new NotFoundException('User not found');

    const userId = user.u_id;

    const date = new Date();

    const existingAttendance = await this.prisma.attendance.findOne({
      where: {
        a_user_document_no: user_document_no,
        a_year: date.getFullYear(),
        a_month: date.getMonth() + 1,
        a_day: date.getDate(),
      },
    });

    if (existingAttendance) throw new ConflictException('Already tapped in');

    const newAttendance = await this.prisma.attendance.create({
      a_document_no: randomUUID(),
      a_u_id: userId,
      a_year: date.getFullYear(),
      a_month: date.getMonth() + 1,
      a_day: date.getDate(),
      a_tap_in: date,
    });

    return new AttendanceResponseDto(newAttendance);
  }

  //Tap out
  async tapOut(user_document_no: string): Promise<AttendanceResponseDto> {
    const user = await this.prisma.user.findUnique({
      u_document_no: user_document_no,
    });

    if (!user) throw new NotFoundException('User not found');

    const date = new Date();

    const existingAttendance = await this.prisma.attendance.findFirst({
      where: {
        a_user_document_no: user_document_no,
        a_year: date.getFullYear(),
        a_month: date.getMonth() + 1,
        a_day: date.getDate(),
      },
    });

    if (!existingAttendance)
      throw new NotFoundException('User has not tapped in');

    const updatedAttendance = await this.prisma.attendance.update({
      where: {
        a_user_document_no: user_document_no,
        a_year: date.getFullYear(),
        a_month: date.getMonth() + 1,
        a_day: date.getDate(),
      },
      data: {
        a_tap_out: date,
      },
    });

    return updatedAttendance;
  }

  //Upload image
  async uploadImage() {}

  //Get attendance from all users
  //Allow filtering based on date
  //In batches of 15
  async fetchAttendance(
    filterDto: FetchAttendanceDto,
  ): Promise<[AttendanceResponseDto]> {
    const { year, month, day, page = 1, count = 15 } = filterDto;

    const whereClause: any = {};
    if (year) whereClause.a_year = year;
    if (month) whereClause.a_month = month;
    if (day) whereClause.a_day = day;

    const attendances = await this.prisma.attendance.findMany({
      whereClause,
      skip: (page - 1) * count,
      take: count,
    });

    return attendances.map(
      (attendance) => new AttendanceResponseDto(attendance),
    );
  }

  //Allow filtering based on date
  //In batches of 15
  async fetchAttendanceByUser(
    filterDto: FetchAttendanceDto,
  ): Promise<[AttendanceResponseDto]> {
    const {
      user_document_no,
      year,
      month,
      day,
      page = 1,
      count = 15,
    } = filterDto;

    const user = await this.prisma.user.findUnique({
      u_document_no: user_document_no,
    });

    if (!user) throw new NotFoundException('User not found');

    const whereClause: any = {};
    if (year) whereClause.a_year = year;
    if (month) whereClause.a_month = month;
    if (day) whereClause.a_day = day;
    whereClause.a_u_id = user.u_id;

    const attendances = await this.prisma.attendance.findMany({
      whereClause,
      skip: (page - 1) * count,
      take: count,
    });

    return attendances.map(
      (attendance) => new AttendanceResponseDto(attendance),
    );
  }
}
