import { useContext, useState } from "react"
import { BracketContext } from "../contexts/Bracket.context";
import { PlayerContext } from "../contexts/Player.context";
import { IdString, MatchRecord, Player, PlayerRecord } from "../util/types.util";

const PlayerResultIcon = (props: {
  icon: string,
  opponentName: string;
  onClick?: () => void
}) => {
  const {
    icon,
    opponentName,
    onClick
  } = props;
  const [ isHovered, setIsHovered ] = useState<boolean>(false);

  return (
    <div
      className="resultIcon"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon}
      <div className="resultTooltipPositioner">
        <div
          className="resultToolTip"
          style={{visibility: isHovered ? 'visible' : 'hidden'}}
        >
          vs. {opponentName}
        </div>
      </div>
    </div>
  )
}

const getPlayerResults = (
  playerKey: IdString,
  playerRecord: PlayerRecord,
  matchRecord: MatchRecord,
  toggleMatchWinner: (matchKey: IdString, playerKey: IdString) => void,
) => {
  let results: React.ReactNode[] = [];
  Object.entries(matchRecord).forEach(([matchKey, match]) => {
    if (match.playerKeys.includes(playerKey)) {
      const icon = (match.winner === undefined) ? '⚪' : (match.winner === playerKey) ? '👑' : '❌'
      const opponentKey = match.playerKeys.filter((key) => key !== playerKey)[0];
      const opponentName = playerRecord[opponentKey].name;
      results.push(
        <PlayerResultIcon
          icon={icon}
          opponentName={opponentName}
          key={'resultIcon' + playerKey + matchKey}
        />
      );
    }
  });
  return (
    <div className="resultIconRow">
      {results}
    </div>
  );
}

const getPlayerWinCount = (playerKey: IdString, matchRecord: MatchRecord): number => {
  let winCount = 0;
  Object.values(matchRecord).forEach(match => {
    if (match.winner === playerKey) winCount++;
  });
  return winCount;
}

export const ResultsDisplay = () => {
  const { playerRecord } = useContext(PlayerContext);
  const { matchCounts, matchRecord, toggleMatchWinner } = useContext(BracketContext);

  const playersToShow: { id: IdString, player: Player, count: number, results: React.ReactNode, winCount: number }[] = [];
  Object.entries(playerRecord).forEach(([ id, player ]) => {
    const count = matchCounts[id];
    const results = getPlayerResults(id, playerRecord, matchRecord, toggleMatchWinner);
    const winCount = getPlayerWinCount(id, matchRecord);
    if (count) {
      playersToShow.push({
        id,
        player,
        count,
        results,
        winCount
      });
    }
  });

  return playersToShow.length > 0 ? (
    <div className="resultsDisplay" style={{marginTop: 40}}>
      <h2>- Results -</h2>
      <table style={{margin: 'auto'}}>
        <thead>
          <tr>
            <th style={{textAlign: 'left'}}>Player</th>
            <th style={{textAlign: 'left'}}>Matches</th>
            <th>Wins</th>
          </tr>
        </thead>
        <tbody>
          {playersToShow.map(({ id, player, count, results, winCount }) => (
            <tr key={'matchCount' + id}>
              <td style={{textAlign: 'left'}}>{player.name}</td>
              <td style={{textAlign: 'left'}}>{results}</td>
              <td>{winCount}/{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : <></>
}
