import { useContext } from "react"
import { BracketContext } from "../contexts/Bracket.context";
import { PlayerContext } from "../contexts/Player.context";
import { IdString, Player } from "../util/types.util";

export const MatchCountDisplay = () => {
  const { playerRecord } = useContext(PlayerContext);
  const { matchCounts } = useContext(BracketContext);

  const playersToShow: { id: IdString, player: Player, count: number }[] = [];
  Object.entries(playerRecord).forEach(([ id, player ]) => {
    const count = matchCounts[id];
    if (count) {
      playersToShow.push({
        id,
        player,
        count
      });
    }
  });

  return playersToShow.length > 0 ? (
    <div style={{marginTop: 40}}>
      <h3>Number of Matches</h3>
      {playersToShow.map(({ id, player, count }) => (
        <div>
          {`${player.name} - ${count}`}
        </div>
      ))}
    </div>
  ) : <></>
}
