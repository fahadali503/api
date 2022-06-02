import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { BusinessModule } from 'src/business/business.module';
import { BusinessService } from 'src/business/business.service';
import { Business } from 'src/business/models/business.model';
import { ImageModel } from 'src/common/models/Image';
import { ImageModule } from 'src/image/image.module';
import { User } from 'src/user/model/User.model';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { SellerResolver } from './seller.resolver';
import { SellerService } from './seller.service';

@Module({
  imports: [
    TypegooseModule.forFeature([User, Business, ImageModel]),
    BusinessModule,
    ImageModule,
    UserModule,
  ],
  providers: [SellerResolver, SellerService, BusinessService, UserService]
})
export class SellerModule { }
