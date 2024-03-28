import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";
import Die from "./Components/Die";
import "./App.css";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzeis, setTenzeis] = useState(false);
  const [tryCount, setTryCount] = useState(0);

  useEffect(() => {
    const isAllHolded = dice.every((die) => die.isHold);
    const firstvalue = dice[0].value;
    const isAllSameValue = dice.every((die) => die.value === firstvalue);
    if (isAllHolded && isAllSameValue) {
      setTenzeis(true);
    }
  }, [dice]);

  function generateNewDice() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHold: false,
    };
  }

  function allNewDice() {
    const diceArr = [];
    for (let i = 0; i < 10; i++) {
      diceArr.push(generateNewDice());
    }
    return diceArr;
  }

  function holdHendler(id) {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        return die.id === id ? { ...die, isHold: !die.isHold } : die;
      });
    });
    setTryCount((prevCount) => prevCount + 1);
  }

  function rollDice() {
    if (!tenzeis) {
      setDice((prevDice) =>
        prevDice.map((die) => (die.isHold ? die : generateNewDice()))
      );
    } else {
      setTenzeis(false);
      setDice(allNewDice);
      setTryCount(0);
    }
  }

  const diceElements = dice.map((die) => {
    return <Die key={die.id} {...die} holdHendler={holdHendler} />;
  });

  return (
    <div className="container mx-auto h-lvh flex items-center flex-col justify-around">
      {tenzeis && <Confetti />}
      <h1 className=" font-bold text-4xl text-center">Tenzies</h1>
      <p className=" w-1/2 md:text-center text-2xl">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <p className="number-of-tries font-bold text-3xl">
        Number Of Tries: {tryCount}
      </p>
      <div className="game-holder flex items-center flex-col gap-4">
        <div className="grid grid-rows-2 grid-cols-5 gap-3">{diceElements}</div>
        <button
          className="game-checker text-4xl px-5 py-2 rounded-lg"
          onClick={rollDice}
        >
          {tenzeis ? "New Game" : "Roll"}
        </button>
      </div>
    </div>
  );
}

export default App;
