import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/games/games.module').then((m) => m.GamesModule),
  },
];
