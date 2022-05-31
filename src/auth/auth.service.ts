import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReturnModelType } from '@typegoose/typegoose';
import { compare } from 'bcryptjs';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'src/user/model/User.model';
import { JWTSECRET } from 'src/utils/constants';
import { IJwtPayload, ILogin } from 'src/utils/types';
import { LoginArgs } from './auth.args';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User) private readonly UserModel: ReturnModelType<typeof User>,
        private jwtService: JwtService
    ) { }

    async validate(email: string, password: string): Promise<User> {
        const user = await this.UserModel.findOne({ email })
        if (!user) {
            throw new NotFoundException("User doesn't exists.")
        }
        const comparedPassword = await compare(password, user.password);
        if (!comparedPassword) {
            throw new BadRequestException("Invalid email/password")
        }
        if (user.blocked) {
            throw new BadRequestException("Your account has been blocked. Please contact help center.")
        }
        return user;
    }
    async login(data: LoginArgs): Promise<ILogin> {
        const user = await this.validate(data.email, data.password);
        const payload: IJwtPayload = { _id: user._id, email: user.email, role: user.role };
        return {
            token: this.jwtService.sign(payload, { secret: JWTSECRET }),
            user
        }
    }
}
