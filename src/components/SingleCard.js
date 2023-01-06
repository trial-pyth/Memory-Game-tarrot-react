import "./singleCard.css";

const SingleCard = ({ card, handleAttempt, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleAttempt(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "turn" : ""}>
        <img class="front" src={card.src} alt="tarrot image" />
        <img src="/img/back.jpg" alt="back" onClick={handleClick} />
      </div>
    </div>
  );
};

export default SingleCard;
