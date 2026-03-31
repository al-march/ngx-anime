import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tabs } from '../tabs';

@Component({
  selector: 'button[demoTab]',
  imports: [CommonModule],
  templateUrl: './tab.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'tab',
    class: 'tab',
    '[class.tab-active]': 'isActive()',
  },
})
export class Tab<T = any> {
  tabs = inject(Tabs, {
    skipSelf: true,
  });

  value = input<T | number>(-1);

  private index = signal(-1);
  isActive = computed(() => this.index() === this.tabs.active());

  setIndex(index: number) {
    this.index.set(index);
  }

  @HostListener('click')
  onClick() {
    this.tabs.selectTab(this.value() || this.index());
  }
}
