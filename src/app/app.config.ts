import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { icons } from './core/icons/icons.provider';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor , errorInterceptor])
    ),
    provideNzIcons(icons),
    provideEnvironmentNgxMask(),
    provideNzI18n(en_US)
  ]
};
