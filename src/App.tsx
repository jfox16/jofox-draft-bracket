import './App.css';
import { AppRouter } from './AppRouter';
import { BracketContext, useBracketContextValue } from './contexts/Bracket.context';
import { PlayerContext, usePlayerContextValue } from './contexts/Player.context';

function App() {
  const playerContextValue = usePlayerContextValue();
  const bracketContextValue = useBracketContextValue();
  return (
    <div className="App">
      <PlayerContext.Provider value={playerContextValue}>
        <BracketContext.Provider value={bracketContextValue}>
          <AppRouter />
        </BracketContext.Provider>
      </PlayerContext.Provider>
    </div>
  );
}

export default App;
