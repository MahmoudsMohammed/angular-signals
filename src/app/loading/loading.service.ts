import { Injectable, signal } from '@angular/core';

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
}
