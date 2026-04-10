import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SIDEBAR_STATE } from '@/app/shared/template/sidebar/sidebar-state';
import { AngularLogo } from '@/app/shared/angular-logo/angular-logo';

@Component({
  selector: 'app-sidebar',
  imports: [AngularLogo],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  expand = inject(SIDEBAR_STATE);
}
