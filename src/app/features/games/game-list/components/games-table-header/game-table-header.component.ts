import {
  Input,
  Output,
  Component,
  EventEmitter,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';

import {
  PlayerCommandReady,
  PlayerCommandStart,
  PlayerCommandCreate,
} from '@models/player-commands';
import { ActiveGame } from '@models/game';

@Component({
  selector: 'app-game-table-header',
  templateUrl: './game-table-header.component.html',
  styleUrl: './game-table-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameTableHeaderComponent {
  @Input() loading: boolean;

  @Input() currentGame: ActiveGame;

  @Input() currentPlayer: string;

  @Input() countdown: number;

  @Output() createGame = new EventEmitter<PlayerCommandCreate>();

  @Output() readyForGame = new EventEmitter<PlayerCommandReady>();

  @Output() startGame = new EventEmitter<PlayerCommandStart>();

  allPlayersReady = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentGame']?.currentValue) {
      this.checkAllPlayersReady();
    }
  }

  onCreate() {
    this.createGame.emit({ name: Date.now().toString(), question_count: 1 });
  }

  onReady() {
    this.readyForGame.emit({ game_id: this.currentGame.id });
  }

  onStart() {
    this.startGame.emit({ game_id: this.currentGame.id });
  }

  private checkAllPlayersReady() {
    this.allPlayersReady =
      Object.keys(this.currentGame.players_ready).length ===
      this.currentGame.player_count;
  }
}
