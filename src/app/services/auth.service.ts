import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

const USER_STORAGE_KEY = 'user';
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
  isLoggedIn = computed(() => !!this.user);
  _http = inject(HttpClient);

  async login(email: string, password: string) {
    const userData = await firstValueFrom(
      this._http.post<User>(`${environment!.apiRoot}/login`, {
        email,
        password,
      })
    );
    console.log(userData);
  }
}
