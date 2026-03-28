import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, inject, input, PLATFORM_ID } from '@angular/core';
import { animate, AnimationParams } from 'animejs';

interface WhatDoesTheDogSay {
  say: () => string;
}

@Directive({
  selector: '[animeEnter]',
})
export class AnimeEnter implements AfterViewInit {
  readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly animeEnter = input<AnimationParams>();

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      const params = this.animeEnter();
      if (params && this.elementRef.nativeElement) {
        animate(this.elementRef.nativeElement, params);
      }
    }
  }
}
