import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { routes } from './games.routes';
import { GamesService } from './games.service';
import { GameComponent } from './game/game.component';
import { ScoresComponent } from './scores/scores.component';
import { GameListComponent } from './game-list/game-list.component';
import { ScoreListComponent } from './scores/components/score-list.component';
import { QuestionComponent } from './game/components/question/question.component';
import { GameTableComponent } from './game-list/components/game-table/game-table.component';
import { GameTableHeaderComponent } from './game-list/components/games-table-header/game-table-header.component';

@NgModule({
  declarations: [
    GameComponent,
    ScoresComponent,
    QuestionComponent,
    GameListComponent,
    GameTableComponent,
    ScoreListComponent,
    GameTableHeaderComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
  providers: [GamesService],
})
export class GamesModule {}
