import { useContext, useEffect, useState } from 'react';
import { PlayerList } from '../components/PlayerList';
import { BracketDisplay } from '../components/BracketDisplay.component';
import { getBalancedMatchups } from '../util/getBalancedMatchups';
import { PlayerContext } from '../contexts/Player.context';
import { IdString, MatchRecord } from '../util/types.util';
import { BracketContext } from '../contexts/Bracket.context';
import { makeUniqueKey } from '../makeUniqueKey';

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

  useEffect(() => {
    makeBracket();
  }, []);

  return (
    <div>
      <h1>Generate a Draft Bracket</h1>
      <PlayerList editable />
      <div style={{marginTop: 20}}>
        <p style={{display: 'inline', marginRight: 5}}>Number of matches per player: </p>
        <input
          onChange={(e) => setNumberOfMatchesPerPlayer(Number(e.target.value))}
          value={numberOfMatchesPerPlayer}
          style={{display: 'span', width: 40}}
          type="number"
        />
      </div>
      <div style={{marginTop: 20}}>
        <button onClick={makeBracket} style={{fontSize: 16, width: 206}}>Make Bracket</button>
      </div>
      <BracketDisplay />
    </div>
  )
}
