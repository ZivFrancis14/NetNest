import '../index.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Existgame() {
  const [joinCode, setJoinCode] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleJoinGame = async () => {
    try {
      const response = await fetch(`http://localhost:5000/rooms/join/${joinCode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (response.ok && result.status) {
        setMessage('Successfully joined the game!');
        console.log('Room ID:', result.roomId); 
        navigate('/playgame', { state: { roomId: result.roomId } });
      } else {
        setMessage(result.message || 'Failed to join the game. Please check the code.');
      }
    } catch (error) {
      console.error('Error joining game:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container">
      <h1>Join an Existing Game</h1>
      <input
        type="text"
        placeholder="Enter join code"
        className="gameInput"
        value={joinCode}
        onChange={(e) => setJoinCode(e.target.value)}
      />
      <button className="joinButton" onClick={handleJoinGame}>
        Join Game
      </button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Existgame;

