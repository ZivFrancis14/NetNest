import { useState } from 'react';
import '../Usergame.css';

const UserGame = () => {
  const [showButtons, setShowButtons] = useState(true);

  const handleCorrectClick = () => {
    console.log('תקין');
    setShowButtons(false); 
  };

  const handleIncorrectClick = () => {
    console.log('לא תקין');
    setShowButtons(false); 
  };

  const handleAddAnonymousSituation = () => {
    console.log('הוספת סיטואציה אנונימית');
  };

  return (
    <div className="phone-frame">
      <div className="user-game-container">
        {showButtons ? (
          <div className="button-container">
            {}
            <button
              className="usergame-button correct-button"
              onClick={handleCorrectClick}
            >
              תקין
            </button>
            
            {}
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
        
        {}
        <button
          className="usergame-button add-situation-button"
          onClick={handleAddAnonymousSituation}
        >
          הוסף סיטואציה אנונימית
        </button>
      </div>
    </div>
  );
};

export default UserGame;
