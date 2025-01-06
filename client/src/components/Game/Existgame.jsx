import '../index.css';

function ExistGame() {
  return (
    <div className="container">
      <h1>Join an Existing Game</h1>
      <input
        type="text"
        placeholder="Enter game code"
        className="gameInput"
      />
      <button className="joinButton">
        Join Game
      </button>
    </div>
  );
}

export default ExistGame;
