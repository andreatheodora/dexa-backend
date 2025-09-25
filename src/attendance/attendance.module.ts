import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';

@Module({
  controllers: [AttendanceController],
  providers: [PrismaService, AttendanceService],
  exports: [AttendanceService],
})
export class AttendanceModule {}
