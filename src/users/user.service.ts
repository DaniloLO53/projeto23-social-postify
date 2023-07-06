import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SignInUserDto } from './user.dto';
import { User } from './user.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      console.log('token', token);
      const decoded = this.jwtService.decode(token);
      console.log('decoded', decoded);
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      console.log('payload.result', payload.result);
      request.user = payload.result;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(user: User): Promise<User> {
    const userAlreadyExists = await this.findUserByEmail(user.email);
    if (userAlreadyExists)
      throw new ConflictException({ message: 'User already exists' });

    const { password, ...result } = user;
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prismaService.user.create({
      data: {
        ...result,
        password: hashedPassword,
      },
    });
  }

  async signInUser(data: SignInUserDto): Promise<any> {
    const userRegistered = await this.findUserByEmail(data.email);
    if (!userRegistered) {
      throw new UnauthorizedException();
    }
    const passwordIsValid = await bcrypt.compare(
      data.password,
      userRegistered.password,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = userRegistered;
    const token = await this.jwtService.signAsync({ result });
    return { token };
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: { email } });
  }
}
