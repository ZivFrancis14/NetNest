import { useState, useEffect, useMemo } from 'react';
import '../Screengame.css';
import { useLocation } from 'react-router-dom';
import React from 'react';

const Screengame = () => {
  const location = useLocation();
  const { roomId } = location.state || {};

  const [bubbles, setBubbles] = useState([]);
  const [selectedText, setSelectedText] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [votes, setVotes] = useState({ correct: 0, incorrect: 0 });
  const [buttonLabel, setButtonLabel] = useState('Show Results');
  const [showResults, setShowResults] = useState(false);
  const [currentScenarioId, setCurrentScenarioId] = useState(null); // Fix: Add state

  const colors = useMemo(() => ['#d291bc', '#b565a7', '#8e44ad', '#6a1b9a', '#9c27b0'], []);

  const getDynamicPositions = (count) => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      positions.push({
        x: Math.random() * (window.innerWidth - 100), // Random X position
        y: Math.random() * (window.innerHeight - 100), // Random Y position
      });
    }
    return positions;
  };

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const response = await fetch("http://localhost:5000/scenarios"); // API URL
        const data = await response.json();
  
        const positions = getDynamicPositions(data.items.length);
  
        const initialBubbles = data.items.map((item, index) => ({
          id: item._id, // MongoDB ObjectId (unique)
          scenario_id: item.scenarioId, // Numeric scenario_id for backend compatibility
          color: colors[index % colors.length],
          position: positions[index],
          text: item.text,
        }));
  
        setBubbles(initialBubbles); // Update bubbles state
      } catch (error) {
        console.error('Error fetching scenarios:', error);
      }
    };
  
    fetchScenarios();
  }, [colors]);
  

  const handleBubbleClick = (bubble) => {
    setSelectedText(bubble.text);
    setCurrentScenarioId(bubble.scenario_id); // Use the numeric scenario_id for the API call
    setIsModalVisible(true);
    setButtonLabel('Show Results');
    setBubbles((prevBubbles) => prevBubbles.filter((b) => b.id !== bubble.id));
    setShowResults(false);
  };
  
  const handleButtonClick = async () => {
    if (buttonLabel === 'Show Results') {
      console.log('roomId:', roomId, 'currentScenarioId:', currentScenarioId); // Debugging
  
      try {
        const response = await fetch(
          `http://localhost:5000/rooms/${roomId}/statistics/${currentScenarioId}` // Send the numeric scenario_id
        );
        const data = await response.json();
  
        if (response.ok) {
          console.log('Vote data:', data);
          setVotes({
            correct: data.correct || 0,
            incorrect: data.incorrect || 0,
          });
          setShowResults(true);
          setButtonLabel('Close');
        } else {
          console.error('Failed to fetch votes:', data.message);
        }
      } catch (error) {
        console.error('Error fetching votes:', error);
      }
    } else {
      closeModal();
    }
  };
  
  
  const closeModal = () => {
    setIsModalVisible(false);
    setVotes({ correct: 0, incorrect: 0 });
    setShowResults(false);
  };

  if (!roomId) {
    return <p>Error: Room ID not provided.</p>;
  }

  return (
    <div className="game-container">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            backgroundColor: bubble.color,
            top: bubble.position.y,
            left: bubble.position.x,
          }}
          onClick={() => handleBubbleClick(bubble)}
        >
          Click me!
        </div>
      ))}

      {isModalVisible && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className={`modal-text ${showResults ? 'modal-text-move' : ''}`}>
              {selectedText}
            </h2>
            {showResults && (
              <div className="results-container">
                <div className="column">
                  <div
                    className="bar correct-bar"
                    style={{
                      height: `${votes.correct * 20}px`,
                      transition: "height 1s ease-in-out",
                    }}
                  >
                    {votes.correct}
                  </div>
                  <p className="column-label">Correct</p>
                </div>
                <div className="column">
                  <div
                    className="bar incorrect-bar"
                    style={{
                      height: `${votes.incorrect * 20}px`,
                      transition: "height 1s ease-in-out",
                    }}
                  >
                    {votes.incorrect}
                  </div>
                  <p className="column-label">Incorrect</p>
                </div>
              </div>
            )}
            <button className="modal-button" onClick={handleButtonClick}>
              {buttonLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Screengame;
