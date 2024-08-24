import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {
  GameEvent,
  GameEventType,
  PlayerJoinPayload,
  PlayerEnterPayload,
  PlayerReadyPayload,
  GameQuestionCorrectPayload,
  GameQuestionIncorrectPayload,
} from '@models/game-events';
import { PlayerEvent } from '@models/player-events';
import { PlayerEventType } from '@models/player-events';
import { ConnectionService } from '@core/connection.service';
import { LiveFeedEvent, LiveFeedIcon } from '@models/live-feed-event';
import { ConnectionEvent, ConnectionEventType } from '@models/connection';

type EventKey = PlayerEventType | GameEventType | ConnectionEventType;
type EventValue = PlayerEvent | GameEvent<unknown> | ConnectionEvent;

@Injectable()
export class LiveFeedService {
  connectionService = inject(ConnectionService);

  player$ = this.connectionService.name$;

  filteredEvents$ = new BehaviorSubject<LiveFeedEvent[]>([]);

  private _events$ = new BehaviorSubject<LiveFeedEvent[]>([]);

  private eventMessageMap: Map<EventKey, Function> = new Map([
    [
      ConnectionEventType.Connected as EventKey,
      this.playerConnectServer.bind(this),
    ],
    [PlayerEventType.Connect, this.playerConnect.bind(this)],
    [PlayerEventType.Disconnect, this.playerDisconnect.bind(this)],
    [GameEventType.PlayerEnter, this.playerEnter.bind(this)],
    [GameEventType.PlayerJoin, this.playerJoin.bind(this)],
    [GameEventType.PlayerReady, this.playerReady.bind(this)],
    [GameEventType.PlayerCorrect, this.playerCorrect.bind(this)],
    [GameEventType.PlayerIncorrect, this.playerIncorrect.bind(this)],
    [GameEventType.Start, this.gameStarted.bind(this)],
    [GameEventType.End, this.gameEnded.bind(this)],
    [GameEventType.Create, this.gameCreate],
  ]);

  init(): void {
    this.connectionService.event$.subscribe((event) => {
      const notification = this.eventMessageMap.get(event.type);

      if (notification) {
        const mappedEvent: LiveFeedEvent = {
          ...notification(event),
          timestamp: Date.now(),
        };

        const events = [mappedEvent, ...this._events$.value];
        this._events$.next(events);
        this.filteredEvents$.next(events);
      }
    });
  }

  search(value: string): void {
    const events = this._events$.value;

    if (!value) {
      this.filteredEvents$.next(events);
      return;
    }

    const filteredEvents = events.filter((event) => {
      return event.message.toLowerCase().includes(value);
    });

    this.filteredEvents$.next(filteredEvents);
  }

  private playerConnectServer(event: EventValue): Partial<LiveFeedEvent> {
    return {
      iconType: LiveFeedIcon.Connected,
      message: `Successfully connected to the world server as ${
        (event as ConnectionEvent).name
      }`,
    };
  }

  private playerConnect(event: PlayerEvent): Partial<LiveFeedEvent> {
    return {
      iconType: LiveFeedIcon.Player,
      message: `${(event as PlayerEvent).player} has connected!`,
    };
  }

  private playerDisconnect(event: PlayerEvent): Partial<LiveFeedEvent> {
    return {
      iconType: LiveFeedIcon.Disconnected,
      message: `${event.player} has disconnected from a game`,
    };
  }

  private playerEnter(
    event: GameEvent<PlayerEnterPayload>
  ): Partial<LiveFeedEvent> {
    return {
      iconType: LiveFeedIcon.Game,
      message: `You have entered ${event.payload.name}`,
    };
  }

  private playerJoin(
    event: GameEvent<PlayerJoinPayload>
  ): Partial<LiveFeedEvent> {
    return {
      iconType: LiveFeedIcon.Game,
      message: `${event.payload.player} has joined your game!`,
    };
  }

  private playerReady(
    event: GameEvent<PlayerReadyPayload>
  ): Partial<LiveFeedEvent> {
    const currentPlayer = this.player$.value;
    const player = event.payload.player;

    return {
      iconType: LiveFeedIcon.Game,
      message:
        currentPlayer === player
          ? 'You are ready to start!'
          : `${player} is ready!`,
    };
  }

  private playerCorrect(
    event: GameEvent<GameQuestionCorrectPayload>
  ): Partial<LiveFeedEvent> {
    const currentPlayer = this.player$.value;
    const player = event.payload.player;

    return {
      iconType: LiveFeedIcon.Game,
      message: `${
        currentPlayer === player ? 'You have' : player + ' has'
      } correctly answered the question!`,
    };
  }

  private playerIncorrect(
    event: GameEvent<GameQuestionIncorrectPayload>
  ): Partial<LiveFeedEvent> {
    const currentPlayer = this.player$.value;
    const player = event.payload.player;

    return {
      iconType: LiveFeedIcon.Game,
      message: `${
        currentPlayer === player ? 'You' : player
      } did not correctly answer the question`,
    };
  }

  private gameCreate(
    event: GameEvent<PlayerEnterPayload>
  ): Partial<LiveFeedEvent> {
    return {
      iconType: LiveFeedIcon.Game,
      message: `${event.payload.name} has been created!`,
    };
  }

  private gameStarted(_event: GameEvent<{}>): Partial<LiveFeedEvent> {
    return {
      iconType: LiveFeedIcon.Game,
      message: `Your game has started!`,
    };
  }

  private gameEnded(_event: GameEvent<{}>): Partial<LiveFeedEvent> {
    return {
      iconType: LiveFeedIcon.Game,
      message: `Your game has ended`,
    };
  }
}
