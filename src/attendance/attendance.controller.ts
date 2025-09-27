import {
  Get,
  Param,
  Controller,
  UseGuards,
  Query,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import type { Response } from 'express';
import { AttendanceService } from './attendance.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { AttendanceResponseDto } from './dto/attendance-response.dto';
import { HrGuard } from 'src/common/guards/hr-guard';
import { FetchAttendanceDto } from './dto/fetch-attendance.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @UseGuards(JwtAuthGuard)
  @Get('tap-in')
  async tapIn(
    @User('sub') userDocumentNo: string,
  ): Promise<AttendanceResponseDto> {
    return this.attendanceService.tapIn(userDocumentNo);
  }

  @UseGuards(JwtAuthGuard)
  @Get('tap-out')
  async tapOut(
    @User('sub') userDocumentNo: string,
  ): Promise<AttendanceResponseDto> {
    return this.attendanceService.tapOut(userDocumentNo);
  }

  @UseGuards(JwtAuthGuard)
  @Get('today')
  async fetchStatus(@User('sub') userDocumentNo: string): Promise<any> {
    if (!userDocumentNo)
      throw new UnauthorizedException('NO USER FOUND IN TOKEN');
    return this.attendanceService.checkAttendanceStatus(userDocumentNo);
  }

  @UseGuards(JwtAuthGuard, HrGuard)
  @Get()
  async fetchAttendance(
    @Query() filterDto: FetchAttendanceDto,
    @Res() res: Response,
  ) {
    const { data, total } =
      await this.attendanceService.fetchAttendance(filterDto);
    res.setHeader('X-Total-Count', total);
    return res.json(data);
  }

  /*
  @UseGuards(JwtAuthGuard)
  @Get(':userDocumentNo')
  async fetchUserAttendance(
    @Param('userDocumentNo') docNo: string,
    @Query() filterDto: FetchAttendanceDto,
  ): Promise<AttendanceResponseDto[]> {
    filterDto.user_document_no = docNo;
    return this.attendanceService.fetchAttendance(filterDto);
  }*/
}
