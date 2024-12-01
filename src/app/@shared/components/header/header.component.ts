import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { UserAuthService } from '../../../@core/services/user-auth.service';
import { Subscription } from 'rxjs';
import { TranslationService } from '../../../@core/services/translation.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  userRole!: string | null;
  roleSubscription!: Subscription;
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService,
    private userAuthService: UserAuthService,
    private translationService: TranslationService
  ) {}

  logout(): void {
    this.auth.logout({ logoutParams: { returnTo: document.location.origin } });
    this.userAuthService.clearRole();
  }

  ngAfterViewInit(): void {
    this.roleSubscription = this.userAuthService.role$.subscribe((role) => {
      this.userRole = role;
    });
  }

  switchLanguage(language: string) {
    this.translationService.switchLanguage(language);
  }

  ngOnDestroy(): void {
    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
  }
}
