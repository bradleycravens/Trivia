export enum GameState {
  Waiting = 'waiting',
  Countdown = 'countdown',
  Question = 'question',
  Ended = 'ended',
}

export interface Game {
  id: string;
  name: string;
  player_count: number;
  question_count: number;
  state: GameState;
}

export interface ActiveGame extends Game {
  players: string[];
  players_ready: { [key: string]: boolean };
}
