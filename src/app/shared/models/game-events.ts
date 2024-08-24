/** 
  GameEventType is a string type that creates the discriminated union of event types.
  The following events are used by to broadcast changes to players not in games about games that are occurring.
*/
export enum GameEventType {
  // Non players
  Create = 'game_create',
  StateChange = 'game_state_change',
  PlayerCount = 'game_player_count',
  Destroy = 'game_destroy',
  // Players
  Start = 'game_start',
  End = 'game_end',
  Countdown = 'game_countdown',
  Question = 'game_question',
  PlayerEnter = 'game_player_enter',
  PlayerJoin = 'game_player_join',
  PlayerReady = 'game_player_ready',
  PlayerLeave = 'game_player_leave',
  PlayerCorrect = 'game_player_correct',
  PlayerIncorrect = 'game_player_incorrect',
}

export interface PlayerEnterPayload {
  name: string;
  players: string[];
  players_ready: { [key: string]: boolean };
  question_count: number;
}

export interface PlayerReadyPayload {
  player: string;
}

export interface PlayerJoinPayload {
  player: string;
}

export interface GameCountdownPayload {
  seconds: number;
}

export interface GameQuestionPayload {
  id: string;
  options: string[];
  question: string;
  seconds: number;
}

export interface GameQuestionCorrectPayload {
  id: string;
  player: string;
}

export interface GameQuestionIncorrectPayload {
  id: string;
  player: string;
}

export interface Score {
  name: string;
  score: number;
}

export interface GameEndPayload {
  scores: Score[]
}

/** GameEvent is sent to players to inform them of changes to a game. */
export interface GameEvent<T> {
  id: string;
  payload: T;
  type: GameEventType;
}

/** GameEventCreate is sent to all players when a game is created */
export interface GameEventCreate {
  name: string;
  question_count: number;
}

/** GameEventStateChange is sent to all players when the game state changes */
export interface GameEventStateChange {
  state: string;
}

/** GameEventPlayerCount is sent to all players when the player count changes */
export interface GameEventPlayerCount {
  player_count: number;
}

/** GameEventDestroy is sent to all players when a game is destroyed and no longer exists on the server. */
export interface GameEventDestroy {}

/** PlayerScore is a simple struct to hold a player's name and score */
export interface PlayerScore {
  name: string;
  score: number;
}

/** GameEventEnd is sent to all players when a game ends and includes the tallied scores for all players. */
export interface GameEventEnd {
  scores: PlayerScore[];
}

/** GameEventStart is sent to all players when a game starts */
export interface GameEventStart {}

/** GameEventCountdown is sent to all players when a countdown to a question begins.*/
export interface GameEventCountdown {
  seconds: number;
}

/** GameEventQuestion is sent to all players when a question is asked */
export interface GameEventQuestion {
  id: string;
  options: string[];
  question: string;
  seconds: number;
}

/** GameEventPlayerEnter is only sent to the player who joined the game */
export interface GameEventPlayerEnter {
  name: string;
  players: string[];
  players_ready: { [key: string]: boolean };
  question_count: number;
}

/** GameEventPlayerJoin is sent to all players when a player joins the game */
export interface GameEventPlayerJoin {
  player: string;
}

/** GameEventPlayerReady is sent to all players when a player is ready */
export interface GameEventPlayerReady {
  player: string;
}

/** GameEventPlayerLeave is sent to all players when a player leaves the game */
export interface GameEventPlayerLeave {
  player: string;
}

/** GameEventPlayerCorrect is sent to all players when a player answers correctly */
export interface GameEventPlayerCorrect {
  id: string;
  player: string;
}

/** GameEventPlayerIncorrect is sent to all players when a player answers incorrectly. */
export interface GameEventPlayerIncorrect {
  id: string;
  player: string;
}
