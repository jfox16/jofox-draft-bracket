import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { MainPage } from './pages/Main.page';
import { NewBracketPage } from './pages/NewBracket.page';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/new-bracket" element={<NewBracketPage />} />
      </Routes>
    </Router>
  );
}
