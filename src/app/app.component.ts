import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './@shared/components/header/header.component';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'car-care';
  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getAccessTokenSilently().subscribe((token) => {
      if (token) {
        console.log('logged in');
      }
    });
  }
}
