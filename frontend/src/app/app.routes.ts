import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/game-randomizer',
    pathMatch: 'full'
  },
  {
    path: 'game-randomizer',
    loadComponent: () => import('./components/game-randomizer/game-randomizer')
      .then(m => m.GameRandomizer)
  },
  {
    path: 'admin',
    loadComponent: () => import('./components/admin/admin')
      .then(m => m.Admin)
  },
  {
    path: '**',
    redirectTo: '/game-randomizer'
  }
];