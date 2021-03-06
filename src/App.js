import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import './App.css';

const cardImages = [
    { src: '/img/frank.png', matched: false },
    { src: '/img/elaine.jpeg', matched: false },
    { src: '/img/jerry.jpeg', matched: false },
    { src: '/img/george.jpeg', matched: false },
    { src: '/img/kramer.jpeg', matched: false },
    { src: '/img/newman.jpeg', matched: false },
];

function App() {
    const [cards, setCards] = useState([]);
    const [turns, setTurns] = useState(0);
    const [choiceOne, setChoiceOne] = useState(null);
    const [choiceTwo, setChoiceTwo] = useState(null);
    const [disabled, setDisabled] = useState(false);

    // shuffle cards
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random() }));

        setChoiceOne(null);
        setChoiceTwo(null);
        setCards(shuffledCards);
        setTurns(0);
    };

    // hanlde a choice
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    };

    useEffect(() => {
        if (choiceOne && choiceTwo) {
            setDisabled(true);
            if (choiceOne.src === choiceTwo.src) {
                setCards((prevCards) => {
                    return prevCards.map((card) => {
                        if (card.src === choiceOne.src) {
                            return { ...card, matched: true };
                        } else {
                            return card;
                        }
                    });
                });
                resetChoice();
            } else {
                setTimeout(() => resetChoice(), 1000);
            }
        }
    }, [choiceOne, choiceTwo]);

    const resetChoice = () => {
        setChoiceOne(null);
        setChoiceTwo(null);
        setTurns((prev) => prev + 1);
        setDisabled(false);
    };

    useEffect(() => {
        shuffleCards();
    }, []);

    return (
        <div className='App'>
            <h1>Surprise Match</h1>
            <button onClick={shuffleCards}>New Game</button>
            <div className='card-grid'>
                {cards.map((card) => (
                    <Card
                        key={card.key}
                        card={card}
                        handleChoice={handleChoice}
                        flipped={
                            card === choiceOne ||
                            card === choiceTwo ||
                            card.matched
                        }
                        disabled={disabled}
                    />
                ))}
            </div>
            <p>Turns: {turns}</p>
        </div>
    );
}

export default App;
