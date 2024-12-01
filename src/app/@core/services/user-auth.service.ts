import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private readonly roleKey = 'userRole';
  private roleSubject = new BehaviorSubject<string | null>(this.getRole());

  getRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  setRole(role: string): void {
    localStorage.setItem(this.roleKey, role);
    this.roleSubject.next(role);
  }

  clearRole(): void {
    localStorage.removeItem(this.roleKey);
    this.roleSubject.next(null);
  }

  role$: Observable<string | null> = this.roleSubject.asObservable();
}
