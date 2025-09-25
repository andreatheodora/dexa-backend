import {
  Body,
  Get,
  Delete,
  Controller,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { HrGuard } from 'src/common/guards/hr-guard';
import { UserResponseDto } from './dto/user-response.dto';

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
  async fetchUsers() {}

  @UseGuards(JwtAuthGuard, HrGuard)
  @Delete(':document_no')
  async deleteUser(@Param('document_no') document_no: string) {
    const dto = new UpdateUserDto();
    dto.is_deleted = true;

    return await this.userService.updateUser(document_no, dto);
  }
}
