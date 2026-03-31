import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './app.routes';
import { Highlighter } from './core/highlighter';
import { DARK_MODE } from '@/app/core/tokens/dark-mode';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAppInitializer(async () => {
      inject(DARK_MODE);
      await inject(Highlighter).init({
        langs: ['ts', 'angular-html', 'scss', 'bash'],
        themes: ['one-dark-pro', 'one-light'],
      });
    }),
  ],
};
