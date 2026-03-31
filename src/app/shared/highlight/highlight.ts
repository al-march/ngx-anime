import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { Code } from '@/app/shared/highlight/code/code';

enum CopyStatus {
  WAIT,
  SUCCESS,
  ERROR,
}

@Component({
  selector: 'app-highlight',
  imports: [Code],
  templateUrl: './highlight.html',
  styleUrl: './highlight.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Highlight {
  code = input<string | null | {} | undefined>(undefined);
  lang = input('');
  clean = input(false, { transform: booleanAttribute });

  codeString = computed(() => String(this.code()));
  copying = signal(CopyStatus.WAIT);
  copyStatus = computed(() => this.computeStatus(this.copying()));

  statuses = CopyStatus;

  async copy() {
    const success = await copyToClipboard(this.codeString());
    if (success) {
      this.setCopyStatus(CopyStatus.SUCCESS);
    } else {
      this.setCopyStatus(CopyStatus.ERROR);
    }
  }

  private setCopyStatus(status: CopyStatus) {
    this.copying.set(status);

    setTimeout(() => {
      this.copying.set(CopyStatus.WAIT);
    }, 1500);
  }

  private computeStatus(status: CopyStatus) {
    switch (status) {
      case CopyStatus.SUCCESS:
        return { text: 'Copied', status };
      case CopyStatus.ERROR:
        return { text: 'Error', status };
      default:
        return { text: 'Copy', status };
    }
  }
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('error while copying: ', err);
    return false;
  }
}
