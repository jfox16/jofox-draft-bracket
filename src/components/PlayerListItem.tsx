import { Player } from "../util/types.util";

interface PlayerListItemProps {
  player: Player;
  editable: boolean;
  updatePlayer: (playerUpdates: Partial<Player>) => void;
  deletePlayer: () => void
}

export const PlayerListItem = (props: PlayerListItemProps) => {
  const { player, editable, updatePlayer, deletePlayer } = props;

  const updatePlayerName = (name: string) => {
    updatePlayer({ name });
  }

  if (editable) {
    return (
      <div>
        <input
          value={player.name}
          onChange={(e) => updatePlayerName(e.target.value)}
          onFocus={(e) => e.target?.select()}
          autoComplete="off"
        />
        <button onClick={deletePlayer}>DELETE</button>
      </div>
    );
  }
  else {
    return (
      <div>
        <p style={{color: player.color}}>{player.name}</p>
      </div>
    );
  }
}