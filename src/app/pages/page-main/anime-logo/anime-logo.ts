import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AnimeEnter, AnimeLeave } from 'ngx-animejs';

@Component({
  selector: 'app-anime-logo',
  imports: [AnimeEnter, AnimeLeave],
  templateUrl: './anime-logo.html',
  styleUrl: './anime-logo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeLogo {
  show = signal(false);
}
