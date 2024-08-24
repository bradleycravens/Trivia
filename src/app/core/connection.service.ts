import { inject, Injectable } from '@angular/core';
import {
  take,
  filter,
  Subject,
  switchMap,
  Observable,
  BehaviorSubject,
} from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { SOCKET_ENDPOINT } from '@injectors/socket-endpoint';
import { PlayerCommandType } from '@models/player-commands';
import { GameEvent, GameEventType } from '@models/game-events';
import { PlayerEvent, PlayerEventType } from '@models/player-events';
import { ConnectionEvent, ConnectionEventType } from '@models/connection';

@Injectable({ providedIn: 'root' })
export class ConnectionService {
  name$ = new BehaviorSubject<string>(null);

  status$ = new BehaviorSubject<boolean>(false);

  event$ = new Subject<GameEvent<unknown> | PlayerEvent | ConnectionEvent>();

  private socket$: WebSocketSubject<any>;

  private SOCKET_ENDPOINT = inject(SOCKET_ENDPOINT);

  connect(channel: string) {
    this.name$.next(channel);

    this.socket$ = webSocket({
      url: `${this.SOCKET_ENDPOINT}?name=${channel}`,
      openObserver: {
        next: () => {
          this.status$.next(true);
          this.event$.next({
            name: channel,
            type: ConnectionEventType.Connected,
          });
        },
      },
      closeObserver: {
        next: () => this.status$.next(false),
      },
    });

    this.socket$.subscribe({
      next: (msg) => this.handleEvent(msg),
      error: (err) => console.log(err),
      complete: () => console.log('complete'),
    });
  }

  listen<T>(
    type: (GameEventType | PlayerEventType | ConnectionEventType)[]
  ): Observable<T> {
    return this.status$.pipe(
      filter(Boolean),
      take(1),
      switchMap(() =>
        this.socket$.pipe(filter((msg) => type.includes(msg.type)))
      )
    );
  }

  listenOnce<T>(
    type: GameEventType | PlayerEventType | ConnectionEventType
  ): Observable<T> {
    return this.status$.pipe(
      filter(Boolean),
      take(1),
      switchMap(() =>
        this.socket$.pipe(
          filter((msg) => msg.type === type),
          take(1)
        )
      )
    );
  }

  sendMessage(payload: object, type: PlayerCommandType) {
    this.socket$.next({ nonce: 'self', payload, type });
  }

  private handleEvent(message: GameEvent<unknown> | PlayerEvent): void {
    console.log(message);
    this.event$.next(message);
  }
}
