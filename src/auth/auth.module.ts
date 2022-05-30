import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from 'src/user/model/User.model';
import { JWTSECRET } from 'src/utils/constants';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypegooseModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({ secret: JWTSECRET })
  ],
  providers: [JwtStrategy, AuthResolver, AuthService]
})
export class AuthModule { }
