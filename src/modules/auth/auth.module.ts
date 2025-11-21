import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BearerAuthGuard } from './bearer-auth.guard';

@Module({
  imports: [ConfigModule],
  providers: [BearerAuthGuard],
  exports: [BearerAuthGuard],
})
export class AuthModule {}
