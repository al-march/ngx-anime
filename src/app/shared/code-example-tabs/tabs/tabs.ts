import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, contentChildren, model } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { shareReplay } from 'rxjs';
import { Tab } from './tab';

@Component({
  selector: 'demo-tabs',
  imports: [CommonModule],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tabs<T> {
  tabs = contentChildren(Tab);
  tabs$ = toObservable(this.tabs);

  tabsChange$ = this.tabs$.pipe(shareReplay(), takeUntilDestroyed());

  active = model<T | null>();

  constructor() {
    this.tabsChange$.subscribe((tabs) => {
      tabs.forEach((tab, i) => tab.setIndex(i));
    });
  }

  selectTab(index: T) {
    this.active.set(index);
  }
}
