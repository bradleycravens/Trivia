import { inject, Injectable } from '@angular/core';

import {
  GameEvent,
  GameEventType,
  GameEndPayload,
  PlayerJoinPayload,
  PlayerReadyPayload,
  GameQuestionPayload,
  GameCountdownPayload,
  GameQuestionIncorrectPayload,
} from '@models/game-events';
import { ConnectionService } from '@core/connection.service';

@Injectable({ providedIn: 'root' })
export class EventService {
  connectionService = inject(ConnectionService);

  externalGameUpdate$ = this.connectionService.listen([
    GameEventType.Create,
    GameEventType.Destroy,
    GameEventType.PlayerJoin,
    GameEventType.PlayerLeave,
  ]);

  playerReadyUp$ = this.connectionService.listen<GameEvent<PlayerReadyPayload>>(
    [GameEventType.PlayerReady]
  );

  playerJoined$ = this.connectionService.listen<GameEvent<PlayerJoinPayload>>([
    GameEventType.PlayerJoin,
  ]);

  gameStarted$ = this.connectionService.listen<GameEvent<{}>>([
    GameEventType.Start,
  ]);

  gameCountdown$ = this.connectionService.listen<
    GameEvent<GameCountdownPayload>
  >([GameEventType.Countdown]);

  question$ = this.connectionService.listen<GameEvent<GameQuestionPayload>>([
    GameEventType.Question,
  ]);

  questionCorrect$ = this.connectionService.listen<
    GameEvent<GameQuestionPayload>
  >([GameEventType.PlayerCorrect]);

  questionIncorrect$ = this.connectionService.listen<
    GameEvent<GameQuestionIncorrectPayload>
  >([GameEventType.PlayerIncorrect]);

  gameEnd$ = this.connectionService.listen<GameEvent<GameEndPayload>>([
    GameEventType.End,
  ]);
}
