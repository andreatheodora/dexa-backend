import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as argon2 from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async signup(dto: SignupDto): Promise<UserResponseDto> {
    const existingUser = await this.prismaService.user.findUnique({
      where: { u_email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hash = await argon2.hash(dto.password);

    const user = await this.prismaService.user.create({
      data: {
        u_email: dto.email,
        u_document_no: randomUUID(),
        u_name: dto.name,
        u_position: dto.position,
        u_division: dto.division,
        u_salary_gross: dto.salary_gross,
        u_address_line1: dto.address_line1,
        u_city: dto.city,
        u_province: dto.province,
        u_postal_code: dto.postal_code,
        u_is_hr: dto.is_hr,
        u_password: hash,
        ...(dto.address_line2 && {
          u_address_line2: dto.address_line2,
        }),
      },
    });

    return new UserResponseDto(user);
  }

  async login(dto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.prismaService.user.findUnique({
      where: { u_email: dto.email },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    if (user.u_is_deleted) throw new NotFoundException('User does not exist');

    const pwMatches = await argon2.verify(user.u_password, dto.password);
    if (!pwMatches) throw new UnauthorizedException('Invalid credentials');

    return this.signToken(user.u_document_no, user.u_is_hr);
  }

  async signToken(document_no: string, is_hr: boolean) {
    const payload = { sub: document_no, is_hr };

    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });

    return { access_token: token };
  }
}
