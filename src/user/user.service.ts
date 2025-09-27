import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserResponseDto } from './dto/user-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FetchUserDto } from './dto/fetch-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async fetchUser(filterDto: FetchUserDto): Promise<UserResponseDto[]> {
    const { document_no, page = 1, count = 15 } = filterDto;

    const users = await this.prisma.user.findMany({
      where: {
        u_document_no: document_no,
        u_is_deleted: false,
      },
      skip: (page - 1) * count,
      take: count,
    });

    return users.map((user) => new UserResponseDto(user));
  }

  async count(): Promise<number> {
    return await this.prisma.user.count({
      where: {
        u_is_deleted: false,
      },
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
