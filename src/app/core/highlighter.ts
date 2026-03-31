import { Injectable } from '@angular/core';
import {
  BundledLanguage,
  BundledTheme,
  createHighlighter,
  HighlighterGeneric,
  LanguageInput,
  SpecialLanguage,
  StringLiteralUnion,
  ThemeInput,
} from 'shiki';

const initializeExample = `
{
  provide: APP_INITIALIZER,
  useFactory: (service: HighlightService) => {
    return () => service.init()
  },
  deps: [HighlightService],
  multi: true,
}
`;

export type Lang = LanguageInput | SpecialLanguage | StringLiteralUnion<BundledLanguage, string>;
export type Theme = ThemeInput | 'none' | StringLiteralUnion<BundledTheme, string>;

interface Init {
  langs: Lang[];
  themes: Theme[];
}

@Injectable({
  providedIn: 'root',
})
export class Highlighter {
  private _highlighter!: HighlighterGeneric<BundledLanguage, BundledTheme>;

  get highlighter() {
    if (this._highlighter) {
      return this._highlighter;
    } else {
      throw new Error(
        [
          `Highlight service should be initialized`,
          `Please, initialize service in APP_INITIALIZER`,
          initializeExample,
        ].join('\n'),
      );
    }
  }

  async init({ langs, themes }: Init) {
    this._highlighter = await createHighlighter({
      themes,
      langs,
    });
  }

  toHtml(code: string, lang: Lang = '', theme: Theme = 'none') {
    return this.highlighter.codeToHtml(code, {
      lang: lang as string,
      theme: theme as string,
    });
  }
}
