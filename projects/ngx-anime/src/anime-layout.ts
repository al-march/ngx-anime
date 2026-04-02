import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import { AutoLayout, AutoLayoutParams, createLayout, utils } from 'animejs';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[animeLayout]',
})
export class AnimeLayout implements OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);
  private zone = inject(NgZone);
  private el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classes = input<string | Record<string, boolean> | string[]>('', {
    alias: 'animeLayout',
  });

  readonly params = input<AutoLayoutParams>();

  private layout?: AutoLayout;
  private initialized = false;

  constructor() {
    this.zone.runOutsideAngular(() => {
      if (!this.isBrowser) return;

      effect(() => {
        this.layout = createLayout(this.el, this.params());
      });

      effect(() => {
        const rawClasses = this.classes();
        const classString = this.normalizeClasses(rawClasses);

        if (!this.initialized) {
          this.el.className = classString;
          this.initialized = true;
          return;
        }

        this.layout?.update(() => {
          this.el.className = classString;
        });
      });
    });
  }

  ngOnDestroy() {
    utils.remove(this.el);
  }

  private normalizeClasses(value: unknown): string {
    if (typeof value === 'string') return value;
    if (Array.isArray(value)) return value.join(' ');
    if (typeof value === 'object' && value) {
      return Object.entries(value)
        .filter(([_, enabled]) => enabled)
        .map(([cls]) => cls)
        .join(' ');
    }
    return '';
  }
}
