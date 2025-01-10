import { Link } from 'react-router';
import './OpeningScreen.css';


function OpeningScreen() {
  const handleJoinGame = () => {
    console.log('Join an existing game');
    // Add logic for joining an existing game here
  };

  const handleCreateGame = () => {
    console.log('Create a new game');
    // Add logic for creating a new game here
  };

  return (
    <div className="container">
      <h1 className="title">Welcome to NetNest!</h1>
      <Link to="/existgame">
      <button className="button" onClick={handleJoinGame}>
        Join an Existing Game</button>
      </Link>


<Link to="/newgame">
      <button className="button" onClick={handleCreateGame}>
        Create a New Game
      </button>
      </Link>
    </div>
  );
}

export default OpeningScreen;
