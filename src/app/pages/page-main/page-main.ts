import { Navbar } from '@/app/shared/template/navbar/navbar';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-page-main',
  imports: [Navbar],
  templateUrl: './page-main.html',
  styleUrl: './page-main.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageMain { }
