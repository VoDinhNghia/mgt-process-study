import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { of } from 'rxjs';
import { UpdateStudySubjectProcessDto } from 'src/modules/study-process/dtos/study-process.subject.update.dto';
import { CommonException } from './execeptionError';

export class ValidatePropertyGuard implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<Headers>();
    const {
      midtermScore,
      finalScore,
      essayCore,
    }: UpdateStudySubjectProcessDto = request['body'];
    const isMidtermScore = midtermScore <= 10 && midtermScore >= 0;
    const isFinalScore = finalScore <= 10 && finalScore >= 0;
    const isEssayCore = essayCore <= 10 && essayCore >= 0;
    if (isMidtermScore && isFinalScore && isEssayCore) {
      return next.handle();
    }

    return of([
      new CommonException(
        400,
        '[Format] - midtermScore finalScore essayCore must >= 0 and <= 10',
      ),
    ]);
  }
}
