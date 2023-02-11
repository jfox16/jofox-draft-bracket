import { useContext, useState } from 'react';

import { BracketDisplay } from '../components/BracketDisplay.component';
import { PlayerList } from '../components/PlayerList';
import { BracketContext } from '../contexts/Bracket.context';
import { PlayerContext } from '../contexts/Player.context';
import { getBalancedMatchups } from '../util/getBalancedMatchups';
import { IdString, MatchRecord } from '../util/types.util';
import { makeUniqueKey } from '../makeUniqueKey';
import { ResetLocalStorageButton } from '../components/ResetLocalStorageButton.component';

export const NewBracketPage = () => {
  const [ numberOfMatchesPerPlayer, setNumberOfMatchesPerPlayer ] = useState<number>(3);
  const { playerRecord } = useContext(PlayerContext);
  const { setMatchRecord } = useContext(BracketContext);

  const makeBracket = () => {
    const playerIds = Object.keys(playerRecord);
    const balancedMatchups = getBalancedMatchups(playerIds, numberOfMatchesPerPlayer);
    const matchRecord: MatchRecord = {}
    balancedMatchups.forEach((matchup: IdString[], i: number) => {
      matchRecord[makeUniqueKey('match')] = {
        name: `Match ${i+1}`,
        playerKeys: matchup
      };
    });
    setMatchRecord(matchRecord);
  }

  return (
    <div>
      <h1>Generate a Draft Bracket</h1>
      <PlayerList editable />
      <div style={{marginTop: 20}}>
        <p style={{display: 'inline', marginRight: 5}}>Number of matches per player: </p>
        <input
          value={numberOfMatchesPerPlayer}
          type="number"
          onChange={(e) => setNumberOfMatchesPerPlayer(Number(e.target.value))}
          onFocus={(e) => e.target.select()} 
          min={0}
          max={100}
          style={{
            display: 'span',
            width: 40
          }}
        />
      </div>
      <div style={{marginTop: 20}}>
        <button onClick={makeBracket} style={{fontSize: 16, width: 206}}>Make Bracket</button>
      </div>
      <BracketDisplay />
      <ResetLocalStorageButton />
    </div>
  )
}
