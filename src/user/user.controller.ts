import {
  Body,
  Get,
  Delete,
  Controller,
  Patch,
  Query,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { HrGuard } from 'src/common/guards/hr-guard';
import { UserResponseDto } from './dto/user-response.dto';
import { FetchUserDto } from './dto/fetch-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, HrGuard)
  @Patch(':document_no')
  async updateUser(
    @Param('document_no') document_no: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const user = await this.userService.updateUser(document_no, dto);
    return user;
  }

  @UseGuards(JwtAuthGuard, HrGuard)
  @Get()
  async fetchUsers(
    @Query() filterDto: FetchUserDto,
  ): Promise<UserResponseDto[]> {
    const users = await this.userService.fetchUser(filterDto);
    return users;
  }

  @UseGuards(JwtAuthGuard, HrGuard)
  @Delete(':document_no')
  async deleteUser(@Param('document_no') document_no: string) {
    const dto = new UpdateUserDto();
    dto.is_deleted = true;

    return await this.userService.updateUser(document_no, dto);
  }
}
