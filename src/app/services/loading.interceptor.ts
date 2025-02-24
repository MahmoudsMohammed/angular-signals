import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../loading/loading.service';
import { delay, filter, finalize, startWith, tap } from 'rxjs';
import { displayLoader } from '../constants/loading.httptokencontext';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  console.log(req.context.get(displayLoader));
  if (!req.context.get(displayLoader)) {
    return next(req);
  }
  return next(req).pipe(
    startWith(null),
    tap(() => loadingService.turnOnLoader()),
    filter((data) => data !== null),
    delay(1000),
    finalize(() => loadingService.turnOffLoader())
  );
};
