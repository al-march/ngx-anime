import { isPlatformBrowser } from '@angular/common';
import { AnimationCallbackEvent, Directive, HostListener, inject, input, PLATFORM_ID } from '@angular/core';
import { animate, AnimationParams, Callback, JSAnimation } from 'animejs';

@Directive({
  selector: '[animeLeave]',
})
export class AnimeLeave {
  readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly animeLeave = input<AnimationParams>();

  @HostListener('animate.leave', ['$event'])
  onLeave(event: any) {
    const { target, animationComplete } = (event as AnimationCallbackEvent);
    const params = this.animeLeave();

    const onComplete: Callback<JSAnimation> = (animation) => {
      params?.onComplete?.(animation);
      animationComplete();
    };

    animate(target, {
      ...params,
      onComplete
    });
  }
}
