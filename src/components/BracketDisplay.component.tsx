import { MatchCountDisplay } from "./MatchCountDisplay.component";
import { MatchList } from "./MatchList";

export const BracketDisplay = () => {

  return (
    <div style={{marginTop: 40}}>
      <MatchList />
      <MatchCountDisplay />
    </div>
  )
}
