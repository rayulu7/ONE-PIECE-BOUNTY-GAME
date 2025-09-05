import { useState, useEffect } from 'react';

const useGameLogic = (gameMode, gameData) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [revealLevel, setRevealLevel] = useState(0);

  // Timer effect
  useEffect(() => {
    if (!gameStarted || gameEnded) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
      
      // For silhouette and manga panel modes, gradually reveal more
      if ((gameMode === 'silhouette' || gameMode === 'manga-panel') && timeLeft % 5 === 0 && revealLevel < 3) {
        setRevealLevel(prev => prev + 1);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameStarted, gameEnded, timeLeft, gameMode, revealLevel]);

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(30);
    setRevealLevel(0);
  };

  const nextQuestion = () => {
    if (currentQuestion < gameData.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(30);
      setRevealLevel(0);
    } else {
      setGameEnded(true);
    }
  };

  const addScore = (points) => {
    setScore(prev => prev + points);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setGameStarted(false);
    setGameEnded(false);
    setRevealLevel(0);
  };

  return {
    currentQuestion,
    score,
    timeLeft,
    gameStarted,
    gameEnded,
    revealLevel,
    startGame,
    nextQuestion,
    addScore,
    resetGame
  };
};

export default useGameLogic;
