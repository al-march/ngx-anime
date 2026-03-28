import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimeEnter } from "./shared/anime-enter";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AnimeEnter],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  show = signal(true);
}
