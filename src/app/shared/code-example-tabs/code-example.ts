import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Tabs } from './tabs';
import { Tab } from '@/app/shared/code-example-tabs/tabs/tab/index';
import { Highlight } from '@/app/shared/highlight/highlight';
import { AnimeEnter, AnimeLeave } from 'ngx-animejs';

enum TabType {
  HTML,
  TS,
  SCSS,
}

const tabTypeToLabel: Record<TabType, string> = {
  [TabType.HTML]: 'HTML',
  [TabType.TS]: 'Typescript',
  [TabType.SCSS]: 'SCSS',
};

@Component({
  selector: 'app-code-example',
  imports: [CommonModule, Tabs, Tab, Highlight, AnimeEnter, AnimeLeave],
  templateUrl: './code-example.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeExample {
  showCode = signal(false);
  activeTab = signal(0);

  html = input<string | null | {}>('');
  ts = input<string | null | {}>('');
  scss = input<string | null | {}>('');

  tabs = computed(() => {
    const output: TabType[] = [];

    if (this.html()) output.push(TabType.HTML);
    if (this.ts()) output.push(TabType.TS);
    if (this.scss()) output.push(TabType.SCSS);
    return output;
  });

  tabType = TabType;
  tabTypeToLabel = tabTypeToLabel;

  highlight = viewChild<ElementRef<HTMLElement>>('tabContent');
  codeHeight = signal<string | number>(0);

  constructor() {
    effect(() => {
      const ref = this.highlight();
      const height = ref?.nativeElement?.offsetHeight || 0;
      this.codeHeight.set(height);
    });
  }

  animeComplete = () => {
    const el = this.highlight()?.nativeElement;
    if (el) {
      el.style.removeProperty('height');
    }
  };
}
