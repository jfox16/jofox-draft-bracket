import { useContext, useState } from "react"
import { BracketContext } from "../contexts/Bracket.context";
import { PlayerContext } from "../contexts/Player.context";
import { IdString, Match } from "../util/types.util";

interface MatchListItemProps {
  matchKey: IdString,
  match: Match;
}

export const MatchList = () => {
  const { playerRecord } = useContext(PlayerContext);
  const { matchRecord, toggleMatchWinner } = useContext(BracketContext);

  const MatchListItem = (props: MatchListItemProps) => {
    const {
      matchKey,
      match
    } = props;
    const [ isHovered, setIsHovered ] = useState<boolean>(false);

    const handleCrownClick = (playerKey: IdString) => {
      toggleMatchWinner(matchKey, playerKey);
    }

    const getIcon = (playerKey: IdString) => {
      const shouldShow = isHovered || match.winner === playerKey;

      const style = {
        opacity: (match.winner === playerKey) ? 1.0 : 0.5,
        width: shouldShow ? 'auto' : 0,
        paddingLeft: shouldShow ? 2 : 0,
      }

      return <div className="crown" onClick={() => handleCrownClick(playerKey)} style={style}>👑</div>;
    }

    const playerIcons = match.playerKeys.map(playerKey => getIcon(playerKey));
    const playerNames = match.playerKeys.map(playerKey => playerRecord[playerKey].name);

    return (
      <div
        className="matchListItem"
        style={{
          background: (match.winner === undefined) ? 'none' : '#292929',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h3>{match.name}</h3>
        <div className="playerRow"><div className="name">{playerNames[0]}</div> {playerIcons[0]}</div>
        <p className="versus" style={{margin: 0}}> - VS - </p>
        <p className="playerRow"><div className="name">{playerNames[1]}</div> {playerIcons[1]}</p>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    }}>
      {Object.entries.length > 0 ? Object.entries(matchRecord).map(([ key, match ]) => (
        <MatchListItem
          match={match}
          matchKey={key}
          key={key}
        />
      )) : <div>Create a bracket above!</div>}
    </div>
  )
}
