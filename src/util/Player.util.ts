import { makeUniqueKey } from "../makeUniqueKey";
import { Player, PlayerRecord } from "./types.util";

export const makeNewPlayer = (playerValues: Partial<Player> = {}): PlayerRecord => ({
  [makeUniqueKey('player')]: {
    name: 'New Player',
    color: 'white',
    ...playerValues
  }
});
