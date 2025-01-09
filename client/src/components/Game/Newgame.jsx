import { Link } from 'react-router';
import '../index.css';

const Newgame = () => {
    return (
<div className="container">
      <h1>Create a New Game</h1>
      <input
        type="text"
        placeholder="Enter game name"
        className="gameInput"
      />
      <Link to="/playgame">
      <button className="createButton" >
        Create Game
      </button>
      </Link>
    </div>
    );
  };
  
  export default Newgame;
  