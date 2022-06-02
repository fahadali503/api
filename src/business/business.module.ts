import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { ImageModel } from 'src/common/models/Image';
import { ImageModule } from 'src/image/image.module';
import { ImageService } from 'src/image/image.service';
import { User } from 'src/user/model/User.model';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { BusinessResolver } from './business.resolver';
import { BusinessService } from './business.service';
import { Business } from './models/business.model';

@Module({
  imports: [
    TypegooseModule.forFeature([Business, ImageModel, User]),
    ImageModule,
    UserModule
  ],
  providers: [BusinessResolver, BusinessService, ImageService, UserService]
})
export class BusinessModule { }
