import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import Auth0Lock from 'auth0-lock';
import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs';
import { UserAuthService } from '../../../../@core/services/user-auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  lock: typeof Auth0Lock;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private auth: AuthService,
    private router: Router,
    private userAuthService: UserAuthService
  ) {
    this.lock = new Auth0Lock(
      'XMmPqW4WPkYJfwXpdphv3RSJaqxgKrT3',
      'dev-clqpfsy6d6v8qggc.uk.auth0.com',
      {
        auth: {
          redirectUrl: 'http://localhost:4200',
          responseType: 'token id_token',
        },
      }
    );
  }

  ngOnInit() {
    this.auth
      .getAccessTokenSilently()
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((token) => {
          if (token) {
            return this.auth.idTokenClaims$;
          } else {
            this.lock.show();
            throw new Error('Token not found');
          }
        })
      )
      .subscribe({
        next: (claims) => {
          const namespace = 'http://localhost:4200/roles';
          const roles = claims?.[namespace] || [];
          if (roles.length > 0) {
            this.userAuthService.setRole(roles[0]);
          }
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Error fetching token or claims', err);
          this.lock.show();
        },
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
