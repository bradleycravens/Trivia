export enum LiveFeedIcon {
  Connected = 'connected',
  Disconnected = 'disconnected',
  Player = 'player',
  Game = 'game',
}

export interface LiveFeedEvent {
  message: string;
  iconType: LiveFeedIcon;
  timestamp: number;
}
