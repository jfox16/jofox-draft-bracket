
export type IdString = string;

export interface Player {
  name: string;
  color: string;
}

export interface Match {
  name: string;
  playerKeys: IdString[];
  winner?: IdString;
}


export interface Bracket {
  matchRecord: MatchRecord
}

export type PlayerRecord = Record<IdString, Player>;
export type MatchRecord = Record<IdString, Match>;
