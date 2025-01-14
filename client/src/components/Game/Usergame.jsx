import { useState } from 'react';
import '../Usergame.css';

const UserGame = () => {
  const [showButtons, setShowButtons] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleCorrectClick = () => {
    console.log('תקין');
    setShowButtons(false);
  };

  const handleIncorrectClick = () => {
    console.log('לא תקין');
    setShowButtons(false);
  };

  const handleAddAnonymousSituation = () => {
    setShowInput(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async() => {
    console.log('סיטואציה אנונימית:', inputValue);

    try{
      const response = await fetch('http://localhost:5000/scenarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputValue }),
      });

      if (!response.ok) {
        throw new Error('Failed to add senario');
      }

      console.log('סיטואציה נוספה בהצלחה:', inputValue);

      setInputValue('');
      setShowInput(false);
    }
    catch (error) {
      console.error('Error adding scenario:', error);
    }

   
  };



  return (
    <div className="phone-frame">
      <div className="user-game-container">
        {showButtons ? (
          <div className="button-container">
            <button
              className="usergame-button correct-button"
              onClick={handleCorrectClick}
            >
              תקין
            </button>
            <button
              className="usergame-button incorrect-button"
              onClick={handleIncorrectClick}
            >
              לא תקין
            </button>
          </div>
        ) : (
          <div className="waiting-text-container">
            <p className="waiting-text">הצבעתך נקלטה בהצלחה</p>
            <p className="waiting-text">המתן לתוצאות</p>
          </div>
        )}

        {showInput ? (
          <div className="input-container">
            <input
              type="text"
              className="text-input"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="הכנס סיטואציה אנונימית"
            />
            <button className="submit-button" onClick={handleSubmit}>
              שליחה
            </button>
          </div>
        ) : (
          <button
            className="usergame-button add-situation-button"
            onClick={handleAddAnonymousSituation}
          >
            הוסף סיטואציה אנונימית
          </button>
        )}
      </div>
    </div>
  );
};

export default UserGame;
