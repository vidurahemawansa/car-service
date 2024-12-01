import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Translations {
  [key: string]: {
    [lang: string]: string;
  };
}

export class CustomLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<any> {
    return this.http.get<Translations>('/assets/translations.json').pipe(
      map((translations: Translations) => {
        const translationKeys = Object.keys(translations).reduce(
          (acc: { [key: string]: string }, key: string) => {
            acc[key] = translations[key][lang];
            return acc;
          },
          {}
        );
        return translationKeys;
      })
    );
  }
}
