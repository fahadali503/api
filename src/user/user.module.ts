import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Image } from 'src/common/models/Image';
import { User } from './model/User.model';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    TypegooseModule.forFeature([User, Image])
  ],
  providers: [UserResolver, UserService]
})
export class UserModule { }
