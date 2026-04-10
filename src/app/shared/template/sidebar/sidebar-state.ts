import {
  effect,
  inject,
  InjectionToken,
  PLATFORM_ID,
  signal,
  type WritableSignal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { WA_LOCAL_STORAGE } from '@ng-web-apis/common';

export const SIDEBAR_STATE = new InjectionToken<WritableSignal<boolean>>('SIDEBAR_STATE', {
  factory: () => {
    const platformId = inject(PLATFORM_ID);
    const isBrowser = isPlatformBrowser(platformId);
    const storage = isBrowser ? inject(WA_LOCAL_STORAGE) : null;
    const saved = storage?.getItem('SIDEBAR');
    const expand = signal(saved ? JSON.parse(saved) : true);

    // TODO: сохранять в lS
    effect(() => {
      const value = String(expand());

      storage?.setItem('SIDEBAR', value);
    });

    return expand;
  },
});
