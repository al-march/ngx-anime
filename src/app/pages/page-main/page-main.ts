import { Navbar } from '@/app/shared/template/navbar/navbar';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { CodeExample } from '@/app/shared/code-example-tabs/index';

@Component({
  selector: 'app-page-main',
  imports: [Navbar, AsyncPipe, NgComponentOutlet, CodeExample],
  templateUrl: './page-main.html',
  styleUrl: './page-main.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageMain {
  example = {
    component: import('./anime-logo/anime-logo').then((c) => c.AnimeLogo),
    HTML: import('./anime-logo/anime-logo.html?raw', { with: { loader: 'text' } }).then(
      (m) => m.default,
    ),
    TS: import('./anime-logo/anime-logo.ts?raw', { with: { loader: 'text' } }).then(
      (m) => m.default,
    ),
  };
}
