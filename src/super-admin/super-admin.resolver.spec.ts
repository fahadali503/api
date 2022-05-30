import { Test, TestingModule } from '@nestjs/testing';
import { SuperAdminResolver } from './super-admin.resolver';

describe('SuperAdminResolver', () => {
  let resolver: SuperAdminResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperAdminResolver],
    }).compile();

    resolver = module.get<SuperAdminResolver>(SuperAdminResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
