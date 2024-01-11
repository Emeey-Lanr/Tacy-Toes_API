export interface GameDetails_I {
    creator: string;
    versus: string;
    gameId: string;
    creatorVersusId: string;
    creatorScore: number;
    versusScore: number;
    creatorSymbol: string,
    versusSymbol: string,
    round:number,
    game: string[];
    whoPlayedLast: string[];
    joined: string[];
}

export interface playGameClientData {
  signatureSign: string;
  arrayPositionId: number;
  isOwner: number;
  creator:string;
  versus: string;
  socketId:string;
  gameId:string;
}