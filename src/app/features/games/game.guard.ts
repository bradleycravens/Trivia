import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { map, of } from 'rxjs';

import { GamesService } from './games.service';

export const canActivateList: CanActivateFn = () => {
  const gamesService = inject(GamesService);
  gamesService.reset();
  return of(true);
};

export const canActivateGame: CanActivateFn = () => {
  const gamesService = inject(GamesService);
  const router = inject(Router);

  return gamesService.currentGame$.pipe(
    map((currentGame) => (currentGame ? true : router.createUrlTree([''])))
  );
};
