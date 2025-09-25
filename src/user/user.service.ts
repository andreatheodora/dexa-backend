import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async updateUser(
    document_no: string,
    dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        u_document_no: document_no,
      },
    });

    if (!existingUser) throw new NotFoundException('User not found');

    const prismaData = {
      ...(dto.email && { u_email: dto.email }),
      ...(dto.name && { u_name: dto.name }),
      ...(dto.position && { u_position: dto.position }),
      ...(dto.division && { u_division: dto.division }),
      ...(dto.salary_gross && { u_salary_gross: dto.salary_gross }),
      ...(dto.address_line1 && { u_address_line1: dto.address_line1 }),
      ...(dto.address_line2 && { u_address_line2: dto.address_line2 }),
      ...(dto.city && { u_city: dto.city }),
      ...(dto.province && { u_province: dto.province }),
      ...(dto.postal_code && { u_postal_code: dto.postal_code }),
      ...(dto.is_hr && { u_is_hr: dto.is_hr }),
      ...(dto.is_deleted && { u_is_deleted: dto.is_deleted }),
    };

    const updatedUser = await this.prisma.user.update({
      where: {
        u_document_no: document_no,
      },
      data: prismaData,
    });

    return new UserResponseDto(updatedUser);
  }
}
