import { Input, Component, ChangeDetectionStrategy } from '@angular/core';

import { Score } from '@models/game-events';

@Component({
  selector: 'app-score-list',
  templateUrl: './score-list.component.html',
  styleUrl: './score-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreListComponent {
  @Input() scores: Score[];
}
