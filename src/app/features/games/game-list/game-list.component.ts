import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map } from 'rxjs';

import {
  PlayerCommandJoin,
  PlayerCommandReady,
  PlayerCommandStart,
  PlayerCommandCreate,
} from '@models/player-commands';
import { GamesService } from '../games.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameListComponent {
  gamesService = inject(GamesService);

  games$ = this.gamesService.games$.pipe(
    map((games) => Array.from(games, ([_, value]) => value))
  );

  currentGame$ = this.gamesService.currentGame$;

  currentPlayer$ = this.gamesService.currentPlayer$;

  countdown$ = this.gamesService.countdown$;

  gamesLoading$ = this.gamesService.gamesLoading$;
  createGameLoading$ = this.gamesService.createGameLoading$;

  ngOnInit(): void {
    this.gamesService.init();
  }

  onCreateGame(create: PlayerCommandCreate) {
    this.gamesService.createGame(create).subscribe();
  }

  onJoinGame(join: PlayerCommandJoin) {
    this.gamesService.joinGame(join).subscribe();
  }

  onReady(ready: PlayerCommandReady) {
    this.gamesService.readyForGame(ready).subscribe();
  }

  onStartGame(start: PlayerCommandStart) {
    this.gamesService.startGame(start).subscribe();
  }
}
