/* eslint-disable class-methods-use-this */
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';

export const KeyAccessApiGuard = (key: string): Type<CanActivate> => {
  class AuthAccessApi {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<Headers>();
      if (request['headers']['key-access-secret'] === key) {
        return true;
      }
      return false;
    }
  }

  return mixin(AuthAccessApi);
};
