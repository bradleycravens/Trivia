import {
  Input,
  Output,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import { ActiveGame, Game, GameState } from '@models/game';
import { PlayerCommandJoin } from '@models/player-commands';

@Component({
  selector: 'app-game-table',
  templateUrl: './game-table.component.html',
  styleUrl: './game-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameTableComponent {
  @Input() games: Game[];

  @Input() currentGame: ActiveGame;

  @Output() joinGame = new EventEmitter<PlayerCommandJoin>();

  loaders = new Array(5);

  GameState = GameState;

  onJoinGame(game: Game) {
    this.joinGame.emit({ game_id: game.id });
  }
}
