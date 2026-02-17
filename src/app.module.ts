import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { TenancyModule } from './modules/tenancy/tenancy.module';
import { UsersModule } from './modules/users/users.module';
import { RbacModule } from './modules/rbac/rbac.module';
import { AuditModule } from './modules/audit/audit.module';

@Module({
  imports: [AuthModule, TenancyModule, UsersModule, RbacModule, AuditModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
