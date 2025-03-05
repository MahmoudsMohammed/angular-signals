import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

const USER_STORAGE_KEY: string = 'user';
export type loginData = {
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #userData = signal<User | null>(null);
  user = this.#userData.asReadonly();
  isLoggedIn = computed(() => !!this.user());
  _http = inject(HttpClient);
  _router = inject(Router);

  constructor() {
    if (USER_STORAGE_KEY in localStorage) {
      this.#userData.set(JSON.parse(localStorage.getItem(USER_STORAGE_KEY)!));
    }

    // effect to store in LS
    effect(() => {
      if (this.#userData()) {
        localStorage.setItem(
          USER_STORAGE_KEY,
          JSON.stringify(this.#userData())
        );
      }
    });
  }

  async login(email: string, password: string) {
    const userData = await firstValueFrom(
      this._http.post<User>(`${environment!.apiRoot}/login`, {
        email,
        password,
      })
    );
    this.#userData.set(userData);
    this._router.navigate(['/']);
  }

  logout() {
    this.#userData.set(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    this._router.navigate(['login']);
  }
}
