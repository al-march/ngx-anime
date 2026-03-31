import { Highlighter, Lang, Theme } from '@/app/core/highlighter';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DARK_MODE } from '@/app/core/tokens/dark-mode';

@Component({
  selector: 'app-code',
  imports: [],
  templateUrl: './code.html',
  styleUrl: './code.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Code {
  sanitizer = inject(DomSanitizer).bypassSecurityTrustHtml;
  highlight = inject(Highlighter);
  darkMode = inject(DARK_MODE);

  code = input<string | null | {} | undefined>(undefined);
  lang = input<Lang>('');

  theme = computed(() => {
    if (this.darkMode()) {
      return 'one-dark-pro';
    } else {
      return 'one-light';
    }
  });

  codeString = computed(() => String(this.code()).trim());
  markupLines = computed(() =>
    this.codeString()
      .trim()
      .split('\n')
      .map((_, i) => i + 1),
  );
  html = computed(() => this.getHtml(this.codeString(), this.lang(), this.theme()));

  private getHtml(code = '', lang: Lang = '', theme: Theme = '') {
    const html = this.highlight.toHtml(code, lang, theme);
    return this.sanitizer(
      html.replace(/background-color:\s*#[0-9A-Fa-f]{3,6}/, 'background-color: inherit'),
    );
  }
}
