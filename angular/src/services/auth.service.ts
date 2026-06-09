import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, of, switchMap } from 'rxjs';

export interface Account {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  private currentUserSubject = new BehaviorSubject<{ id: number; name: string; email: string } | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    const saved = localStorage.getItem('currentUser');
    if (saved) {
      this.currentUserSubject.next(JSON.parse(saved));
    }
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<Account[]>(`${this.apiUrl}/accounts`).pipe(
      map((accounts) => {
        const account = accounts.find((a) => a.email === email && a.password === password);
        if (account) {
          const user = { id: account.id, name: account.name, email: account.email };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return true;
        }
        return false;
      }),
    );
  }

  signup(name: string, email: string, password: string): Observable<boolean> {
    return this.http.get<Account[]>(`${this.apiUrl}/accounts`).pipe(
      switchMap((accounts) => {
        if (accounts.some((a) => a.email === email)) return of(false);
        const maxId = accounts.reduce((m, a) => Math.max(m, a.id), 0);
        const newAccount = { id: maxId + 1, name, email, password };
        return this.http.post(`${this.apiUrl}/accounts`, newAccount).pipe(map(() => true));
      }),
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  get isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }
}
