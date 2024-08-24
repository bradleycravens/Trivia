import { inject, Component, ChangeDetectionStrategy } from '@angular/core';

import { GamesService } from '../games.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoresComponent {
  gamesService = inject(GamesService);

  scores$ = this.gamesService.scores$;
}
