import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import('./pages/page-main/page-main')
      .then(c => c.PageMain)
  }
];
