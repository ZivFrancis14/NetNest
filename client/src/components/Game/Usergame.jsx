import '../Usergame.css';

const UserGame = () => {
  const handleCorrectClick = () => {
    console.log('תקין');
  };

  const handleIncorrectClick = () => {
    console.log('לא תקין');
  };

  const handleAddAnonymousSituation = () => {
    console.log('הוספת סיטואציה אנונימית');
  };

  return (
    <div className="user-game-container">
      <div className="button-container">
        <button className="button correct-button" onClick={handleCorrectClick}>
          תקין
        </button>
        <button className="button incorrect-button" onClick={handleIncorrectClick}>
          לא תקין
        </button>
      </div>
      <button className="button add-situation-button" onClick={handleAddAnonymousSituation}>
        הוסף סיטואציה אנונימית
      </button>
    </div>
  );
};

export default UserGame;