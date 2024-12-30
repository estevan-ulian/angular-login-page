import { routes } from './app.routes';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideToastr({
      progressBar: true,
      timeOut: 3000,
    }),
    CookieService,
  ],
};
