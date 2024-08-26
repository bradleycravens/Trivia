import { Routes } from '@angular/router';

import { canActivateList, canActivateGame } from './game.guard';
import { GameComponent } from './game/game.component';
import { GameListComponent } from './game-list/game-list.component';
import { ScoresComponent } from './scores/scores.component';

export const routes: Routes = [
  {
    path: '',
    component: GameListComponent,
    canActivate: [canActivateList],
  },
  {
    path: 'game/:gameId',
    component: GameComponent,
    canActivate: [canActivateGame],
  },
  {
    path: 'game/:gameId/scores',
    component: ScoresComponent,
    canActivate: [canActivateGame],
  },
];
