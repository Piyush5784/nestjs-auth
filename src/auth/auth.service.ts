import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/model/user-schema';
import { loginUserDto, registerUserDto } from 'src/dto/user-dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from 'src/model/admin-schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userSchema: mongoose.Model<User>,
    @InjectModel('Admin') private readonly adminSchema: mongoose.Model<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(registerUserDto: registerUserDto): Promise<{}> {
    const { email, password, username } = registerUserDto;
    const existingUser = await this.userSchema.findOne({
      username,
    });

    if (existingUser) throw new ConflictException('user already exists');

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.userSchema.create({
      username,
      password: hashedPassword,
      email,
    });

    const filterdUser = {
      username: user.username,
      email: user.email,
    };

    return filterdUser;
  }

  async getUser(username: string): Promise<{}> {
    try {
      const user = await this.userSchema.findOne({
        username: username,
      });

      if (!user) throw new NotFoundException('User not found');

      return user.username;
    } catch (error) {
      console.log(error);
    }
  }

  async login(loginUserDto: loginUserDto): Promise<{ token: string }> {
    const { username, password } = loginUserDto;

    const user = await this.userSchema.findOne({
      username,
    });

    if (!user) throw new NotFoundException('user not found');

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) throw new UnauthorizedException('Invalid password');

    return {
      token: this.jwtService.sign({
        username,
      }),
    };
  }
}
