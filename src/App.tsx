import './App.css';
import { AppRouter } from './AppRouter';
import { BracketContext, useBracketContextValue } from './contexts/Bracket.context';
import { PlayerContext, usePlayerContextValue } from './contexts/Player.context';

import './styles.css';

const App = () => {
  const playerContextValue = usePlayerContextValue();
  const bracketContextValue = useBracketContextValue();
  console.info('App.tsx rerendering');
  return (
    <div className="App" style={{margin: 'auto', maxWidth: 800, paddingBottom: 40}}>
      <PlayerContext.Provider value={playerContextValue}>
        <BracketContext.Provider value={bracketContextValue}>
          <AppRouter />
        </BracketContext.Provider>
      </PlayerContext.Provider>
    </div>
  );
}

export default App;
