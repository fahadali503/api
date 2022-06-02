import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ImageModel } from 'src/common/models/Image';
import { ImageModule } from 'src/image/image.module';
import { ImageService } from 'src/image/image.service';
import { BusinessResolver } from './business.resolver';
import { BusinessService } from './business.service';
import { Business } from './models/business.model';

@Module({
  imports: [
    TypegooseModule.forFeature([Business, ImageModel]),
    ImageModule
  ],
  providers: [BusinessResolver, BusinessService, ImageService]
})
export class BusinessModule { }
