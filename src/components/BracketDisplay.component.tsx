import { ResultsDisplay } from "./ResultsDisplay.component";
import { MatchList } from "./MatchList";

export const BracketDisplay = () => {

  return (
    <div style={{marginTop: 40}}>
      <MatchList />
      <ResultsDisplay />
    </div>
  )
}
