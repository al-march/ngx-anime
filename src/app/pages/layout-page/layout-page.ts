import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodeExample } from '@/app/shared/code-example-tabs';
import { AsyncPipe, NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-layout-page',
  imports: [CodeExample, AsyncPipe, NgComponentOutlet],
  templateUrl: './layout-page.html',
  styleUrl: './layout-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutPage {
  animeLayout = {
    component: import('./layout/layout').then((c) => c.Layout),
    HTML: import('./layout/layout.html?raw', { with: { loader: 'text' } }).then((m) => m.default),
    TS: import('./layout/layout.ts?raw', { with: { loader: 'text' } }).then((m) => m.default),
  };
}
