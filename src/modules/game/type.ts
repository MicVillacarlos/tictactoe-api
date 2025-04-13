export interface IPlayer {
  _id: string;
  name: string;
  score: number;
}

export interface IGame extends Document {
  playerX: IPlayer;
  playerO: IPlayer;
}
export interface FetchGameData {
  _id: string;
  playerX: IPlayer;
  playerO: IPlayer;
  createdAt: string;
  updatedAt: string;
  __v: number;
  rounds: number;
  overAllWinner: IPlayer | null;
}
