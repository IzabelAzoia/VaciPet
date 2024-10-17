import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('tutor/login')
  async login(@Body() body: { email: string; password: string }) {
    const tutor = await this.authService.validateTutor(
      body.email,
      body.password,
    );
    if (tutor) {
      return {
        success: true,
        tutor,
      };
    } else {
      return {
        success: false,
        message: 'Invalid email or password',
      };
    }
  }
}
