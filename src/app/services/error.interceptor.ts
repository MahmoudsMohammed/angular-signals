import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessagesService } from '../messages/messages.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessagesService);
  return next(req).pipe(
    catchError((err) => {
      messageService.setMessage('There Is Some Error', 'error');
      return throwError(() => err);
    })
  );
};
