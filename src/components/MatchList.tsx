import { useContext } from "react"
import { BracketContext } from "../contexts/Bracket.context";
import { PlayerContext } from "../contexts/Player.context";
import { IdString, Match, Player } from "../util/types.util";

interface MatchListItemProps {
  match: Match;
}

export const MatchList = () => {
  const { playerRecord } = useContext(PlayerContext);
  const { matchRecord } = useContext(BracketContext);

  const getPlayerNameById = (idString: IdString) => {
    const name = playerRecord[idString];
    return String(name);
  }
  

  const MatchListItem = (props: MatchListItemProps) => {
    const { match } = props;
    const player1: Player = playerRecord[match.playerKeys[0]] ?? {};
    const player2: Player = playerRecord[match.playerKeys[1]] ?? {};

    return (
      <div style={{
        border: '1px solid white',
        minWidth: 200,
      }}>
        <h3>{match.name}</h3>
        <p style={{marginBottom: 4}}>{player1.name}</p>
        <p style={{margin: 0}}> -VS- </p>
        <p style={{marginTop: 4}}>{player2.name}</p>
      </div>
    )
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
          key={key}
        />
      )) : <div>Create a bracket above!</div>}
    </div>
  )
}
