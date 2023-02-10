import { useContext } from "react"
import { BracketContext } from "../contexts/Bracket.context";
import { PlayerContext } from "../contexts/Player.context";
import { IdString, Match, MatchRecord, Player } from "../util/types.util";

const getPlayerResults = (playerKey: IdString, matchRecord: MatchRecord): string => {
  let results = '';
  Object.values(matchRecord).forEach((match: Match) => {
    if (match.playerKeys.includes(playerKey)) {
      results += (match.winner === undefined) ? '⚪' : (match.winner === playerKey) ? '👑' : '❌'
    }
  });
  return results;
}

export const MatchCountDisplay = () => {
  const { playerRecord } = useContext(PlayerContext);
  const { matchCounts, matchRecord } = useContext(BracketContext);

  const playersToShow: { id: IdString, player: Player, count: number, results: string }[] = [];
  Object.entries(playerRecord).forEach(([ id, player ]) => {
    const count = matchCounts[id];
    const results = getPlayerResults(id, matchRecord);
    if (count) {
      playersToShow.push({
        id,
        player,
        count,
        results
      });
    }
  });

  return playersToShow.length > 0 ? (
    <div style={{marginTop: 40}}>
      <h3>Bracket Results</h3>
      <table style={{margin: 'auto'}}>
        <thead>
          <tr>
            <th style={{textAlign: 'left'}}>Player</th>
            <th style={{textAlign: 'left'}}>Matches</th>
            <th>Wins</th>
          </tr>
        </thead>
        <tbody>
          {playersToShow.map(({ id, player, count, results }) => (
            <tr key={'matchCount' + id}>
              <td style={{textAlign: 'left'}}>{player.name}</td>
              <td style={{textAlign: 'left'}}>{results}</td>
              <td>{results.split('👑').length - 1}/{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : <></>
}
