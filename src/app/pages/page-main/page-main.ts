import { Navbar } from '@/app/shared/template/navbar/navbar';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AnimeEnter, AnimeLeave } from 'ngx-animejs';

@Component({
  selector: 'app-page-main',
  imports: [Navbar, AnimeEnter, AnimeLeave],
  templateUrl: './page-main.html',
  styleUrl: './page-main.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageMain {
  show = signal(false);
}
