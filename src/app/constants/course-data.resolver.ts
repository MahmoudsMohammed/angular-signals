import { ResolveFn } from '@angular/router';

export const courseDataResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
