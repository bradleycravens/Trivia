import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { PlayerCommandAnswer } from '@models/player-commands';

import { GamesService } from '../games.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameComponent {
  gamesService = inject(GamesService);

  currentGame$ = this.gamesService.currentGame$;

  currentQuestion$ = this.gamesService.currentQuestion$;

  onSubmitAnswer(answer: PlayerCommandAnswer) {
    this.gamesService.answerQuestion(answer);
  }
}
