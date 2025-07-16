import envConfig from '@config/env.config';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class InfraAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const token = clearHeaderAuthorization(request.headers.authorization);
    if (token !== envConfig.INFRA_SECRET_KEY) {
      throw new UnauthorizedException();
    }

    return true;
  }
}

function clearHeaderAuthorization(str: string | undefined) {
  return str?.replace('Bearer ', '') || '';
}
