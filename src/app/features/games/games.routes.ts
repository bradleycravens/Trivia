import { Routes } from '@angular/router';

import { canActivate } from './game.guard';
import { GameComponent } from './game/game.component';
import { GameListComponent } from './game-list/game-list.component';
import { ScoresComponent } from './scores/scores.component';

export const routes: Routes = [
  {
    path: '',
    component: GameListComponent,
  },
  {
    path: 'game/:gameId',
    component: GameComponent,
    canActivate: [canActivate],
  },
  {
    path: 'game/:gameId/scores',
    component: ScoresComponent,
    canActivate: [canActivate],
  },
];
