import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/model/user-schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Admin, adminSchema } from 'src/model/admin-schema';
import { RolesGuard } from 'src/Guards/role-guard';

@Module({
  exports: [AuthModule, AuthService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: userSchema },
      { name: Admin.name, schema: adminSchema },
    ]),
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (ConfigService: ConfigService) => ({
        secret: ConfigService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: ConfigService.get<string>('JWT_EXPIRATION') },
      }),
      inject: [ConfigService],
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, RolesGuard],
})
export class AuthModule {}
