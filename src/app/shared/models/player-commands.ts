/** 
  PlayerCommandType is a string type that creates the discriminated union of player commands.
  Player commands that can be given to the server by a player. 
*/
export enum PlayerCommandType {
  Create = 'create',
  Join = 'join',
  Ready = 'ready',
  Start = 'start',
  Answer = 'answer',
}

/** PlayerCommand message structure */
export interface PlayerCommand {
  nonce: string;
  payload: object;
  type: PlayerCommandType;
}

/** PlayerCommandCreate creates a game */
export interface PlayerCommandCreate {
  name: string;
  question_count: number;
}

/** PlayerCommandJoin joins a game */
export interface PlayerCommandJoin {
  game_id: string;
}

/** PlayerCommandReady marks a player as ready */
export interface PlayerCommandReady {
  game_id: string;
}

/** PlayerCommandStart starts a game, only available to first player */
export interface PlayerCommandStart {
  game_id: string;
}

/** PlayerCommandAnswer answers a question with an answer */
export interface PlayerCommandAnswer {
  game_id: string;
  index: number;
  question_id: string;
}
