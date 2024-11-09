import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from "@angular/core";
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from "@angular/router";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
//    new TranslateHttpLoader(http, './assets/i18n/', '.json');

export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '.\\assets\\i18n\\', '.json'); // Ensure this path is correct
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
  provideHttpClient(withFetch()), CookieService,

  importProvidersFrom([TranslateModule.forRoot({
    defaultLanguage: "en",
    loader: {
      provide: TranslateLoader,
      useFactory: httpLoaderFactory,
      deps: [HttpClient],
    },
  })]), provideAnimationsAsync(), provideAnimationsAsync()
  ]};

// export const appConfig: ApplicationConfig = {
//   providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
//   provideHttpClient(withFetch()), CookieService
//   ]
// };
