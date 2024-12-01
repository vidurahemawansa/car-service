import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAuth0 } from '@auth0/auth0-angular';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { CoreModule } from './core.module';
import { HttpClient } from '@angular/common/http';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';
import { CustomLoader } from './@core/services/app.translate.loader';

import { routes } from './app.routes';

export function HttpLoaderFactory(http: HttpClient) {
  return new CustomLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAuth0({
      domain: 'dev-clqpfsy6d6v8qggc.uk.auth0.com',
      clientId: 'XMmPqW4WPkYJfwXpdphv3RSJaqxgKrT3',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
    provideCharts(withDefaultRegisterables()),
    importProvidersFrom(CoreModule),
    importProvidersFrom(HttpClient),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    TranslateService,
  ],
};
