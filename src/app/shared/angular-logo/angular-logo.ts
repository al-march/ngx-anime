import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-angular-logo',
  imports: [],
  templateUrl: './angular-logo.html',
  styleUrl: './angular-logo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularLogo {
}
