import { createContext, useState } from 'react';
import { makeNewPlayer } from "../util/Player.util";
import { Player, PlayerRecord } from '../util/types.util';

interface IPlayerContext {
  playerRecord: PlayerRecord;
  setPlayerRecord: (players: PlayerRecord) => void;
  addPlayer: (playerValues?: Partial<Player>) => void;
  updatePlayer: (key: string, updates?: Partial<Player>) => void;
  deletePlayer: (key: string) => void;
  getPlayerNameByKey: (playerKey: string) => string;
}

const getInitialPlayerRecord = () => {
  return {
    ...makeNewPlayer({ name: 'Player 1', color: 'white'}),
    ...makeNewPlayer({ name: 'Player 2', color: 'gray' }),
    ...makeNewPlayer({ name: 'Player 3', color: 'gray' }),
    ...makeNewPlayer({ name: 'Player 4', color: 'gray' }),
  };
}

export const PlayerContext = createContext<IPlayerContext>({} as IPlayerContext);

export const usePlayerContextValue = (): IPlayerContext => {
  const [ playerRecord, setPlayerRecord ] = useState<PlayerRecord>(getInitialPlayerRecord());

  const addPlayer = (player?: Partial<Player>) => {
    if (Object.entries(playerRecord).length < 8) {
      setPlayerRecord({
        ...playerRecord,
        ...makeNewPlayer(player)
      });
    }
  }
  
  const updatePlayer = (playerKey: string, player?: Partial<Player>): void => {
    const updatedPlayer = {
      ...playerRecord[playerKey],
      ...player
    };
    const playersWithOneUpdated = {
      ...playerRecord,
      [playerKey]: updatedPlayer
    }
    setPlayerRecord(playersWithOneUpdated);
  };

  const deletePlayer = (playerKey: string) => {
    if (Object.entries(playerRecord).length > 2) {
      const { [playerKey]: _, ...playersWithOneDeleted } = playerRecord;
      setPlayerRecord(playersWithOneDeleted);
    }
  }

  const getPlayerNameByKey = (playerKey: string): string => {
    return playerRecord[playerKey].name;
  }

  console.log('usePlayerContextValue', { playerRecord })

  return {
    playerRecord,
    setPlayerRecord,
    addPlayer,
    updatePlayer,
    deletePlayer,
    getPlayerNameByKey
  };
}
