import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { BusinessResolver } from './business.resolver';
import { BusinessService } from './business.service';
import { Business } from './models/business.model';

@Module({
  imports: [
    TypegooseModule.forFeature([Business])
  ],
  providers: [BusinessResolver, BusinessService]
})
export class BusinessModule { }
