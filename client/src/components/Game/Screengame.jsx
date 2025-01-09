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
  const sentences = useMemo(() => [
 'Example 1',
    'Example 2',
    'Example 3',
    'Example 4',
    'Example 5',
  ], []);

  const getFixedPositions = () => [
    { x: 100, y: 100 },
    { x: window.innerWidth - 200, y: 100 },
    { x: window.innerWidth / 2 - 50, y: window.innerHeight / 2 - 50 },
    { x: 250, y: window.innerHeight - 200 },
    { x: window.innerWidth - 350, y: window.innerHeight - 170 },
  ];

  useEffect(() => {
    const initialBubbles = getFixedPositions().map((position, index) => ({
      id: index,
      color: colors[index % colors.length],
      position,
      text: sentences[index % sentences.length],
    }));
    setBubbles(initialBubbles);
  }, [colors, sentences]);

  const handleBubbleClick = (bubble) => {
    setSelectedText(bubble.text);
    setIsModalVisible(true);
    setButtonLabel('Show Results'); 
    setShowResults(false); 
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
                  <p className="column-label">תקין</p>
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
                  <p className="column-label">לא תקין</p>
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
