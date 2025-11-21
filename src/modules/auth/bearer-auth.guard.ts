import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BearerAuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    const validToken = this.configService.get<string>('API_KEY');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid or missing Bearer token');
    }

    const token = authHeader.substring(7);

    if (!token || token !== validToken) {
      throw new UnauthorizedException('Invalid Bearer token');
    }

    return true;
  }
}
