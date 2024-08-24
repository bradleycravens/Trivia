export enum ConnectionEventType {
  Connected = 'connected',
}

export interface ConnectionEvent {
  type: ConnectionEventType;
  name: string;
}
