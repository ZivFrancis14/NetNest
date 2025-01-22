import '../index.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function Newgame() {
  const [gameName, setGameName] = useState(''); 
  const [message, setMessage] = useState(''); 
  const [roomDetails, setRoomDetails] = useState(null); 
  const [gameCreated, setGameCreated] = useState(false); 
  const navigate = useNavigate();


  const handleCreateGame = async () => {
    if (!gameName.trim()) {
      setMessage('Please enter a valid game name.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/rooms/create-new-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: gameName }), 
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Game created successfully!');
        setRoomDetails(result);
        setGameCreated(true); 
      } else {
        setMessage(result.message || 'Failed to create the game. Please try again.');
        setRoomDetails(null);
      }
    } catch (error) {
      console.error('Error creating game:', error);
      setMessage('An error occurred. Please try again later.');
      setRoomDetails(null); 
    }
  };
  const handleJoinGame = async () => {
    try {
      const response = await fetch(`http://localhost:5000/rooms/join/${roomDetails.join_code}`, {
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
      
      {!gameCreated ? (
        <>
        <h1>Create a New Game</h1>
          <input
            type="text"
            placeholder="Enter game name"
            className="gameInput"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
          />
          <button className="createButton" onClick={handleCreateGame}>
            Create Game
          </button>
          {message && <p className="message">{message}</p>}
        </>
      ) : (
        <>
          {message && <h1 className="message">{message}</h1>}
          {roomDetails && (
            <div className="roomDetails">
              <h3>Room Details:</h3>
              <p><strong>Join Code:</strong> {roomDetails.join_code}</p>
              <br />
              <button className="startGame" onClick={handleJoinGame}>
        Start
      </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Newgame;
