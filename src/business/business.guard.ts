import { BadRequestException, CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';
import { IJwtPayload } from 'src/utils/types';
import { BusinessService } from './business.service';

@Injectable()
export class CreateBusinessGuard implements CanActivate {
  constructor(
    private readonly BusinessService: BusinessService,
    private readonly UserService: UserService
  ) { }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req as Request
    const user = req.user as IJwtPayload;
    const doesUserHasBusiness = await this.BusinessService.findBusinessByUserId(user._id);
    const userAccount = await this.UserService.findUserById(user._id);
    if (userAccount.isPremiumAccount) {
      return true;
    }
    if (doesUserHasBusiness.length > 0) {
      throw new BadRequestException("You already have an business. Please upgrade to Premium Account.")
    }
    return true;
  }

}
