import { useContext } from "react"
import { PlayerListItem } from "./PlayerListItem";
import { Player } from "../util/types.util";
import { PlayerContext } from "../contexts/Player.context";

interface PlayerListProps {
  editable?: boolean;
}

export const PlayerList = (props: PlayerListProps) => {
  const { editable } = props;
  const { playerRecord, addPlayer, updatePlayer, deletePlayer } = useContext(PlayerContext);
  
  return (
    <div>
      {Object.entries(playerRecord).map(([ key, player ]) =>
        <PlayerListItem
          player={player}
          editable={!!editable}
          deletePlayer={() => deletePlayer(key)}
          updatePlayer={(playerUpdates: Partial<Player>) => updatePlayer(key, playerUpdates)}
          key={key}
          />)}
      {editable && <button onClick={() => addPlayer()}>+ Add Player</button>}
    </div>
  )
}
