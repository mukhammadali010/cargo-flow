import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { map } from 'rxjs';
import { AuthResponse, User } from './login/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private _token = signal<string | null>(localStorage.getItem('token'));
  private _user = signal<User | null>(JSON.parse(localStorage.getItem('user') || 'null'));

  token = computed(() => this._token());
  user = computed(() => this._user());

  login(phone: string, password: string) {
    return this.http
      .get<User[]>(`http://localhost:3000/users?phone=${phone}&password=${password}`)
      .pipe(
        map((users) => {
          if (!users.length) {
            throw new Error('Invalid credentials');
          }
          const response: AuthResponse = {
            token: 'fake-jwt-token',
            user: users[0],
          };
          this._token.set(response.token);
          this._user.set(response.user);

          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          return response;
        }),
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._token.set(null);
    this._user.set(null);
  }

  isLoggedIn = computed(() => !!this._token());
}
