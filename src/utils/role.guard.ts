import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles.decorator';
import { IJwtPayload } from './types';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector
  ) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return true;
    }
    const req = GqlExecutionContext.create(context).getContext().req as Request;
    const user = req.user as IJwtPayload;
    return roles.includes(user.role);
  }
}
