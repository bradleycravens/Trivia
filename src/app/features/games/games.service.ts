import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';

import {
  PlayerCommandType,
  PlayerCommandJoin,
  PlayerCommandStart,
  PlayerCommandCreate,
  PlayerCommandAnswer,
} from '@models/player-commands';
import {
  Score,
  GameEvent,
  GameEventType,
  PlayerEnterPayload,
  PlayerReadyPayload,
  GameQuestionPayload,
  GameCountdownPayload,
} from '@models/game-events';
import { BASE_URL } from '@injectors/base-url';
import { EventService } from '@core/event.service';
import { indicate, update } from '@utils/rxjs-operators';
import { ActiveGame, Game, GameState } from '@models/game';
import { ConnectionService } from '@core/connection.service';

@Injectable()
export class GamesService {
  http = inject(HttpClient);

  router = inject(Router);

  baseUrl = inject(BASE_URL);

  eventService = inject(EventService);

  connectionService = inject(ConnectionService);

  currentPlayer$ = this.connectionService.name$;

  games$ = new BehaviorSubject<Map<string, Game>>(new Map([]));

  currentGame$ = new BehaviorSubject<ActiveGame>(null);

  currentQuestion$ = new BehaviorSubject<GameQuestionPayload>(null);

  countdown$ = new BehaviorSubject<number>(null);

  scores$ = new BehaviorSubject<Score[]>(null);

  // Loaders
  gamesLoading$ = new BehaviorSubject<boolean>(false);
  createGameLoading$ = new BehaviorSubject<boolean>(false);
  joinGameLoading$ = new BehaviorSubject<boolean>(false);

  init(): void {
    this.getGames().subscribe();
    this.initListeners();
    this.countdown$.next(null);
  }

  getGames(): Observable<Map<string, Game>> {
    return this.http.get<Game[]>(`${this.baseUrl}/games`).pipe(
      map((games) => new Map(games.map((game) => [game.id, game]))),
      indicate(this.gamesLoading$),
      update(this.games$)
    );
  }

  createGame(payload: PlayerCommandCreate): Observable<ActiveGame> {
    this.connectionService.sendMessage(payload, PlayerCommandType.Create);

    return this.connectionService
      .listenOnce<GameEvent<PlayerEnterPayload>>(GameEventType.PlayerEnter)
      .pipe(
        tap((event) => this.updateGameList(event)),
        map((event) => this.mapToActiveGame(event)),
        indicate(this.createGameLoading$),
        update(this.currentGame$)
      );
  }

  joinGame(payload: PlayerCommandJoin): Observable<ActiveGame> {
    this.connectionService.sendMessage(payload, PlayerCommandType.Join);

    return this.connectionService
      .listenOnce<GameEvent<PlayerEnterPayload>>(GameEventType.PlayerEnter)
      .pipe(
        tap((event) => this.updateGameList(event)),
        map((event) => this.mapToActiveGame(event)),
        indicate(this.joinGameLoading$),
        update(this.currentGame$)
      );
  }

  readyForGame(payload: PlayerCommandJoin): Observable<ActiveGame> {
    this.connectionService.sendMessage(payload, PlayerCommandType.Ready);

    return this.connectionService
      .listenOnce<GameEvent<PlayerReadyPayload>>(GameEventType.PlayerReady)
      .pipe(
        map((event) => this.updatePlayersReady(event)),
        indicate(this.joinGameLoading$),
        update(this.currentGame$)
      );
  }

  startGame(payload: PlayerCommandStart): Observable<any> {
    this.connectionService.sendMessage(payload, PlayerCommandType.Start);

    return this.connectionService
      .listenOnce<GameEvent<{}>>(GameEventType.Start)
      .pipe(indicate(this.joinGameLoading$));
  }

  answerQuestion(payload: PlayerCommandAnswer) {
    this.connectionService.sendMessage(payload, PlayerCommandType.Answer);
  }

  reset() {
    this.currentGame$.next(null);
    this.currentQuestion$.next(null);
  }

  private initListeners() {
    this.eventService.externalGameUpdate$
      .pipe(switchMap(() => this.getGames()))
      .subscribe();

    this.eventService.playerJoined$
      .pipe(
        map((event) => this.updatePlayers(event)),
        update(this.currentGame$)
      )
      .subscribe();

    this.eventService.playerReadyUp$
      .pipe(
        map((event) => this.updatePlayersReady(event)),
        update(this.currentGame$)
      )
      .subscribe();

    this.eventService.gameStarted$.subscribe();

    this.eventService.gameCountdown$.subscribe((event) => {
      this.startCountdown(event, () => {
        if (this.currentGame$.value) {
          this.router.navigate(['game', this.currentGame$.value.id]);
        }
      });
    });

    this.eventService.gameCountdown$.subscribe((event) => {
      this.startCountdown(event, () => {
        if (this.currentGame$.value) {
          this.router.navigate(['game', this.currentGame$.value.id]);
        }
      });
    });

    this.eventService.question$.subscribe((event) => {
      const question = event.payload;
      this.currentQuestion$.next(question);
    });

    this.eventService.gameEnd$.subscribe((event) => {
      this.scores$.next(event.payload.scores);
      if (this.currentGame$.value) {
        this.router.navigate(['game', this.currentGame$.value.id, 'scores']);
      }
    });
  }

  private updateGameList(event: GameEvent<PlayerEnterPayload>): void {
    const games = this.games$.value;
    const { name, players, question_count } = event.payload;

    games.set(event.id, {
      name,
      id: event.id,
      question_count,
      state: GameState.Waiting,
      player_count: players.length,
    });

    this.games$.next(games);
  }

  private mapToActiveGame(event: GameEvent<PlayerEnterPayload>): ActiveGame {
    const { name, players, question_count, players_ready } = event.payload;

    return {
      name,
      players,
      id: event.id,
      players_ready,
      question_count,
      state: GameState.Waiting,
      player_count: players.length,
    };
  }

  private updatePlayers(event: GameEvent<PlayerReadyPayload>): ActiveGame {
    const { player } = event.payload;
    const currentGame = this.currentGame$.value;

    currentGame.player_count += 1;
    currentGame.players.push(player);
    return { ...currentGame };
  }

  private updatePlayersReady(event: GameEvent<PlayerReadyPayload>): ActiveGame {
    const { player } = event.payload;
    const currentGame = this.currentGame$.value;

    currentGame.players_ready[player] = true;
    return { ...currentGame };
  }

  private startCountdown(
    event: GameEvent<GameCountdownPayload>,
    callback: Function
  ): void {
    let timeLeft = event.payload.seconds;
    this.countdown$.next(timeLeft);
    timeLeft--;

    const timer = setInterval(() => {
      if (timeLeft === -1) {
        clearInterval(timer);
        callback();
        return;
      }
      this.countdown$.next(timeLeft);
      timeLeft--;
    }, 1000);
  }
}
