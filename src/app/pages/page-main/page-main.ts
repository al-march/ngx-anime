import { Navbar } from '@/app/shared/template/navbar/navbar';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Sidebar } from '@/app/shared/template/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-page-main',
  imports: [Navbar, Sidebar, RouterOutlet],
  templateUrl: './page-main.html',
  styleUrl: './page-main.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageMain {}
