import { useState, useEffect, useMemo } from 'react';
import '../Screengame.css';

const Screengame = () => {
  const [bubbles, setBubbles] = useState([]);
  const [selectedText, setSelectedText] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [votes, setVotes] = useState({ correct: 0, incorrect: 0 });
  const [buttonLabel, setButtonLabel] = useState('Show Results');
  const [showResults, setShowResults] = useState(false);

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

        // Generate positions dynamically based on the number of scenarios
        const positions = getDynamicPositions(data.items.length);

        // Process the data to create bubbles
        const initialBubbles = data.items.map((item, index) => ({
          id: item._id, // Unique ID from the database
          color: colors[index % colors.length], // Color from the predefined list
          position: positions[index], // Position from the dynamic positions
          text: item.text, // Text from the database
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
    setIsModalVisible(true);
    setButtonLabel('Show Results'); 
    setShowResults(false); 
    setBubbles((prevBubbles) => prevBubbles.filter((b) => b.id !== bubble.id));
  };

  const handleButtonClick = () => {
    if (buttonLabel === 'Show Results') {
      setVotes({ correct: Math.floor(Math.random() * 10), incorrect: Math.floor(Math.random() * 10) });
      setShowResults(true);
      setButtonLabel('Close');
    } else {
      closeModal();
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setVotes({ correct: 0, incorrect: 0 });
    setShowResults(false);
  };

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

      {/* Modal */}
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
