import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  secret: process.env.JWT_SECRET || 'defaultSecretKey',
  signOptions: {
    expiresIn: '1h',
  },
};
