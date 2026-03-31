import { Navbar } from '@/app/shared/template/navbar/navbar';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AnimeEnter, AnimeLeave } from 'ngx-animejs';
import { Highlight } from '@/app/shared/highlight/highlight';

@Component({
  selector: 'app-page-main',
  imports: [Navbar, AnimeEnter, AnimeLeave, Highlight],
  templateUrl: './page-main.html',
  styleUrl: './page-main.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageMain {
  show = signal(false);

  code = `
@if (show()) {
  <div
    [animeEnter]="{
      x: '120px',
      rotate: '1turn',
      scale: [0, 1],
      ease: 'outBack(1.7)',
    }"
    [animeLeave]="{ x: '0px', rotate: '-1turn', scale: 0 }"
    class="bg-primary w-[40px] h-[40px] rounded-lg shrink-0"
  ></div>
}`.trim();
}
