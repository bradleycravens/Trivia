import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { map } from 'rxjs';

import { GamesService } from './games.service';

export const canActivate: CanActivateFn = () => {
  const gamesService = inject(GamesService);
  const router = inject(Router);

  return gamesService.currentGame$.pipe(
    map((currentGame) => (currentGame ? true : router.createUrlTree([''])))
  );
};
