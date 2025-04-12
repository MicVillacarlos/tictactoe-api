export interface IPlayer {
  name: string;
  score: number;
}

export interface IGame extends Document {
  playerX: IPlayer;
  playerO: IPlayer;
}

export interface FetchGameData {
    
}