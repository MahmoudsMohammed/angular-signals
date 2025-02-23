import { Injectable, signal } from '@angular/core';
import { filter, finalize, Observable, startWith, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  #isLoading = signal(false);
  loading = this.#isLoading.asReadonly();

  turnOnLoader() {
    this.#isLoading.set(true);
  }

  turnOffLoader() {
    this.#isLoading.set(false);
  }

  showUntilComplete(req: Observable<any>): Observable<any> {
    return req.pipe(
      startWith(null),
      tap(() => this.turnOnLoader()),
      filter((data) => data !== null),
      finalize(() => this.turnOffLoader())
    );
  }
}
