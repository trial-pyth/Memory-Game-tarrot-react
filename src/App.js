import "./App.css";
import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";

const tarrotCards = [
  { src: "/img/chariot.jpeg", match: false },
  { src: "/img/death.jpeg", match: false },
  { src: "/img/fool.jpeg", match: false },
  { src: "/img/hermit.jpeg", match: false },
  { src: "/img/magician.jpeg", match: false },
  { src: "/img/strength.jpeg", match: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [attemptOne, setAttemptOne] = useState(null);
  const [attemptTwo, setAttemptTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //intialize and shuffle cards
  const shuffleCards = () => {
    let shuffledCards = [...tarrotCards, ...tarrotCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random().toFixed(2) }));

    setAttemptOne(null);
    setAttemptTwo(null);
    setCards(
      [...shuffledCards]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() }))
    );

    setTurns(0);
  };

  //record Attempt
  const handleAttempt = (card) => {
    attemptOne ? setAttemptTwo(card) : setAttemptOne(card);
  };

  console.log(cards);

  //comparing selected cards
  useEffect(() => {
    if (attemptOne && attemptTwo) {
      setDisabled(true);
      if (attemptOne.src === attemptTwo.src) {
        setCards((prev) => {
          return prev.map((card) => {
            if (card.src === attemptOne.src) {
              return { ...card, match: true };
            } else {
              return card;
            }
          });
        });
        revertTurn();
      } else {
        console.log("those cards do not match");
        setTimeout(() => revertTurn(), 1250);
      }
    }
  }, [attemptOne, attemptTwo]);

  const revertTurn = () => {
    setAttemptOne(null);
    setAttemptTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  //initialize game
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <div className="image">
        <img src="/img/tarrot-card-image-white.png" alt="" />
      </div>
      <button onClick={shuffleCards}>New Game</button>
      <div className="div card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleAttempt={handleAttempt}
            flipped={card === attemptOne || card === attemptTwo || card.match}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turn:{turns}</p>
    </div>
  );
}

export default App;
