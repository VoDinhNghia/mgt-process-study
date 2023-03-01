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
    if (!midtermScore && !finalScore && !essayCore) {
      return of([
        new CommonException(
          400,
          '[Format] - midtermScore finalScore essayCore must provided.',
        ),
      ]);
    }
    const isMidtermScore = midtermScore
      ? midtermScore <= 10 && midtermScore >= 0
      : true;
    const isFinalScore = finalScore
      ? finalScore <= 10 && finalScore >= 0
      : true;
    const isEssayCore = essayCore ? essayCore <= 10 && essayCore >= 0 : true;
    if (isMidtermScore && isFinalScore && isEssayCore) {
      return next.handle();
    }

    return of([
      new CommonException(
        400,
        '[Format] - midtermScore or finalScore or essayCore must >= 0 and <= 10',
      ),
    ]);
  }
}
