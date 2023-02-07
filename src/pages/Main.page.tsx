import { Link } from 'react-router-dom';

export const MainPage = () => {
  return (
    <div>
      <p>Welcome to the Draft Bucket Generator</p>
      <Link to="new-bracket">Create Bracket</Link>
    </div>
  )
}
