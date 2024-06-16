import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { loginUserDto, registerUserDto } from 'src/dto/user-dto';
import { AuthService } from './auth.service';
import { User } from 'src/model/user-schema';
import { AuthGuard } from 'src/Guards/auth-guard';
import { RolesGuard } from 'src/Guards/role-guard';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(
    @Body(ValidationPipe) registerUserDto: registerUserDto,
  ): Promise<{}> {
    return this.authService.registerUser(registerUserDto);
  }

  @Post('login')
  loginUser(
    @Body(ValidationPipe) loginUserDto: loginUserDto,
  ): Promise<{ token: string }> {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Get('profile')
  async getUserProfile(@Req() request: Request): Promise<{ message: string }> {
    const user = request['username'];
    const dbUsername = await this.authService.getUser(user.username);
    return {
      message: 'Hello ' + dbUsername,
    };
  }
}
