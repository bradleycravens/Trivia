/** 
  PlayerEventType is the discriminating union string that differentiates events.
  Player events transcend the scope of games and can happen anywhere at any time.
*/
export enum PlayerEventType {
  Connect = 'player_connect',
  Disconnect = 'player_disconnect',
}

/** PlayerEvent is a message that is sent to all players in the system about other players. */
export interface PlayerEvent {
  payload: object;
  player: string;
  type: PlayerEventType;
}

/** PlayerEventConnect is sent to all players when a player connects */
export interface PlayerEventConnect {}

/** PlayerEventDisconnect is sent to all players when a player disconnects */
export interface PlayerEventDisconnect {}
