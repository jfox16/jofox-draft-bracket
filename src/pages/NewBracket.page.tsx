import { useContext, useState } from 'react';
import { PlayerList } from '../components/PlayerList';
import { BracketDisplay } from '../components/BracketDisplay.component';
import { getBalancedMatchups } from '../util/getBalancedMatchups';
import { PlayerContext } from '../contexts/Player.context';
import { IdString, MatchRecord } from '../util/types.util';
import { BracketContext } from '../contexts/Bracket.context';
import { makeUniqueKey } from '../makeUniqueKey';

export const NewBracketPage = () => {
  const [ numberOfMatchesPerPlayer, setNumberOfMatchesPerPlayer ] = useState<number>(3);
  const { playerRecord, getPlayerNameByKey } = useContext(PlayerContext);
  const { setMatchRecord } = useContext(BracketContext);

  const makeBracket = () => {
    const playerIds = Object.keys(playerRecord);
    const balancedMatchups = getBalancedMatchups(playerIds, numberOfMatchesPerPlayer);
    const matchRecord: MatchRecord = {}
    balancedMatchups.forEach((matchup: IdString[], i: number) => {
      const balancedMatchupNames = [
        getPlayerNameByKey(matchup[0]),
        getPlayerNameByKey(matchup[1])
      ];
      matchRecord[makeUniqueKey('match')] = {
        name: `Match ${i+1}`,
        playerKeys: matchup
      };
    });
    setMatchRecord(matchRecord);
  }

  return (
    <div>
      <PlayerList editable />
      <input onChange={(e) => setNumberOfMatchesPerPlayer(Number(e.target.value))} value={numberOfMatchesPerPlayer} />
      <button onClick={makeBracket}>Make Bracket</button>
      <BracketDisplay />
    </div>
  )
}
