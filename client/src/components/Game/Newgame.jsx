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
      <button className="createButton">
        Create Game
      </button>
    </div>
    );
  };
  
  export default Newgame;
  