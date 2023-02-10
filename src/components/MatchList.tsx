import { useContext, useState } from "react"
import { BracketContext } from "../contexts/Bracket.context";
import { PlayerContext } from "../contexts/Player.context";
import { IdString, Match, Player } from "../util/types.util";

interface MatchListItemProps {
  matchKey: IdString,
  match: Match;
}

export const MatchList = () => {
  const { playerRecord } = useContext(PlayerContext);
  const { matchRecord, updateMatch } = useContext(BracketContext);

  const MatchListItem = (props: MatchListItemProps) => {
    const { matchKey, match } = props;
    const [ isHovered, setIsHovered ] = useState<boolean>(false);
    const player1: Player = playerRecord[match.playerKeys[0]] ?? {};
    const player2: Player = playerRecord[match.playerKeys[1]] ?? {};

    const handleCrownClick = (playerKey: IdString) => {
      if (match.winner !== playerKey) {
        updateMatch(matchKey, { winner: playerKey });
      }
      else {
        updateMatch(matchKey, { winner: undefined });
      }
    }

    const getIcon = (playerKey: IdString) => {
      const style = {
        cursor: 'pointer',
        opacity: (match.winner === playerKey) ? 1.0 : 0.5
      }

      const shouldShow = isHovered || match.winner === playerKey;

      return shouldShow ? <span onClick={() => handleCrownClick(playerKey)} style={style}>👑</span> : <></>;
    }

    const player1Icon = getIcon(match.playerKeys[0]);
    const player2Icon = getIcon(match.playerKeys[1]);

    return (
      <div
        style={{
          border: '1px solid white',
          minWidth: 180,
          background: (match.winner === undefined) ? '#292929' : '#191919',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h3>{match.name}</h3>
        <p style={{marginBottom: 4}}>{player1.name} {player1Icon}</p>
        <p style={{margin: 0}}> - VS - </p>
        <p style={{marginTop: 4}}>{player2.name} {player2Icon}</p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    }}>
      {Object.entries.length > 0 ? Object.entries(matchRecord).map(([key, match]) => (
        <MatchListItem
          match={match}
          matchKey={key}
          key={key}
        />
      )) : <div>Create a bracket above!</div>}
    </div>
  )
}
