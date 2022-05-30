import { Module } from '@nestjs/common';
import { SuperAdminResolver } from './super-admin.resolver';
import { SuperAdminService } from './super-admin.service';

@Module({
  providers: [SuperAdminResolver, SuperAdminService]
})
export class SuperAdminModule {}
