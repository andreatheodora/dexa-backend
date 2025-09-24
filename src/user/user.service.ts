import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /*
  async createUser(data: CreateUserDto) {
    return this.prisma.user.create({
      u_document_no: randomUUID(),
      u_email: data.email,
      u_name: data.name,
      u_position: data.position,
      u_division: data.division,
      u_salary_gross: data.salary_gross,
      u_address_line1: data.address_line1,
      u_address_line2: data.address_line1 ?? '',
      u_city: data.city,
      u_province: data.province,
      u_postal_code: data.postal_code,
      u_is_hr: data.is_hr,
      u_is_deleted: false,
    });
  }*/

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => new UserResponseDto(user));
  }

  async findOne(document_no: string): Promise<UserResponseDto> {
    return this.prisma.user.findUnique({
      where: { u_document_no: document_no },
    });
  }
}
