import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MessagesService } from '../messages/messages.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _authService = inject(AuthService);
  const _route = inject(Router);
  const _messageService = inject(MessagesService);
  if (_authService.isLoggedIn()) {
    return true;
  } else {
    _messageService.setMessage('Unauthorized', 'error');
    return _route.createUrlTree(['login']);
  }
};
