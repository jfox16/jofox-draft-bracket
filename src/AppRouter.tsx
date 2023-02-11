import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import { NewBracketPage } from './pages/NewBracket.page';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NewBracketPage />} />
      </Routes>
    </Router>
  );
}
