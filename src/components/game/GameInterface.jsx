import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaVolumeUp, FaVolumeMute, FaKeyboard } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

// Import game data
import silhouetteData from '../../data/silhouetteData';
import devilFruitData from '../../data/devilFruitData';
import bountyPosterData from '../../data/bountyPosterData';
import gearFormData from '../../data/gearFormData';
import crewData from '../../data/crewData';
import mangaPanelData from '../../data/mangaPanelData';
import fusionData from '../../data/fusionData';

const GameInterface = () => {
  const { gameMode } = useParams();
  const navigate = useNavigate();
  const { user, updateBounty } = useAuth();
  
  // Game state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameData, setGameData] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [revealLevel, setRevealLevel] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  
  // Load appropriate game data based on mode
  useEffect(() => {
    let data;
    switch(gameMode) {
      case 'silhouette':
        data = silhouetteData;
        break;
      case 'devil-fruit':
        data = devilFruitData;
        break;
      case 'bounty-poster':
        data = bountyPosterData;
        break;
      case 'gear-form':
        data = gearFormData;
        break;
      case 'crew':
        data = crewData;
        break;
      case 'manga-panel':
        data = mangaPanelData;
        break;
      case 'fusion':
        data = fusionData;
        break;
      default:
        navigate('/game-modes');
        return;
    }
    
    // Shuffle and select 10 questions
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    setGameData(shuffled.slice(0, 10));
  }, [gameMode, navigate]);
  
  // Timer effect
  useEffect(() => {
    if (!gameStarted || gameEnded) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          handleTimeUp();
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
    toast.info('Game started! Good luck!');
  };
  
  const handleTimeUp = () => {
    toast.error('Time\'s up!');
    goToNextQuestion(0); // 0 points for timeout
  };
  
  const handleSubmitAnswer = () => {
    if (!answer.trim()) {
      toast.warning('Please enter an answer!');
      return;
    }
    
    checkAnswer(answer);
  };
  
  
  const checkAnswer = (userAnswer) => {
    let isCorrect = false;
    let pointsEarned = 0;
    
    const currentItem = gameData[currentQuestion];
    
    switch(gameMode) {
      case 'silhouette':
      case 'bounty-poster':
      case 'manga-panel':
        // Simple character name matching
        isCorrect = userAnswer.toLowerCase() === currentItem.character.toLowerCase();
        pointsEarned = isCorrect ? calculatePoints(currentItem.points) : 0;
        break;
        
      case 'devil-fruit':
        // Check if they got character and/or crew
        const characterCorrect = userAnswer.toLowerCase().includes(currentItem.character.toLowerCase());
        const crewCorrect = userAnswer.toLowerCase().includes(currentItem.crew.toLowerCase());
        
        if (characterCorrect && crewCorrect) {
          isCorrect = true;
          pointsEarned = calculatePoints(currentItem.points + 100); // Bonus for getting both
        } else if (characterCorrect) {
          isCorrect = true;
          pointsEarned = calculatePoints(currentItem.points);
        } else {
          isCorrect = false;
          pointsEarned = 0;
        }
        break;
        
      case 'gear-form':
        // Check if they got character and form
        const charCorrect = userAnswer.toLowerCase().includes(currentItem.character.toLowerCase());
        const formCorrect = userAnswer.toLowerCase().includes(currentItem.form.toLowerCase());
        
        if (charCorrect && formCorrect) {
          isCorrect = true;
          pointsEarned = calculatePoints(currentItem.points);
        } else {
          isCorrect = false;
          pointsEarned = 0;
        }
        break;
        
      case 'crew':
        // Check if they got the crew name
        isCorrect = userAnswer.toLowerCase() === currentItem.crew.toLowerCase();
        pointsEarned = isCorrect ? calculatePoints(currentItem.points) : 0;
        break;
        
      case 'fusion':
        // Check if they got both characters
        const char1Correct = userAnswer.toLowerCase().includes(currentItem.fusion.character1.toLowerCase());
        const char2Correct = userAnswer.toLowerCase().includes(currentItem.fusion.character2.toLowerCase());
        
        if (char1Correct && char2Correct) {
          isCorrect = true;
          pointsEarned = calculatePoints(currentItem.points);
        } else if (char1Correct || char2Correct) {
          isCorrect = true;
          pointsEarned = Math.floor(calculatePoints(currentItem.points) / 2); // Half points for one character
        } else {
          isCorrect = false;
          pointsEarned = 0;
        }
        break;
        
      default:
        break;
    }
    
    if (isCorrect) {
      toast.success(`Correct! +${pointsEarned} points`);
      setScore(prev => prev + pointsEarned);
    } else {
      toast.error('Incorrect answer!');
    }
    
    goToNextQuestion(pointsEarned);
  };
  
  const calculatePoints = (basePoints) => {
    // More points for faster answers and fewer hints
    let timeBonus = Math.floor((timeLeft / 30) * (basePoints * 0.5));
    let hintPenalty = hintUsed ? Math.floor(basePoints * 0.2) : 0;
    
    return basePoints + timeBonus - hintPenalty;
  };
  
  const goToNextQuestion = (pointsEarned) => {
    if (currentQuestion < gameData.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(30);
      setRevealLevel(0);
      setAnswer('');
      setHintUsed(false);
    } else {
      // Game over
      endGame(pointsEarned);
    }
  };
  
  const showHint = () => {
    if (!hintUsed) {
      setHintUsed(true);
      toast.info(`Hint: ${gameData[currentQuestion]?.hints[0]}`);
    } else {
      toast.warning('You already used a hint for this question!');
    }
  };
  
  const endGame = async (finalQuestionPoints) => {
    setGameEnded(true);
    const finalScore = score + finalQuestionPoints;
    
    // Convert score to bounty (1 point = 1000 berries)
    const bountyEarned = finalScore * 1000;
    
    // Update user's bounty in Firebase
    try {
      await updateBounty(bountyEarned);
      toast.success(`Game Over! You earned ${bountyEarned} berries!`);
    } catch (error) {
      toast.error('Failed to update bounty');
      console.error(error);
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  
  const renderGameContent = () => {
    if (!gameData.length) return <div className="text-center">Loading...</div>;
    
    if (!gameStarted) {
      return (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Play?</h2>
          <p className="mb-6">You'll have 30 seconds for each question. Good luck!</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold"
            onClick={startGame}
          >
            Start Game
          </motion.button>
        </div>
      );
    }
    
    if (gameEnded) {
      return (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
          <p className="text-lg mb-2">Final Score: {score}</p>
          <p className="text-lg mb-6">Bounty Earned: {score * 1000} berries</p>
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold"
              onClick={() => navigate('/game-modes')}
            >
              Play Another Mode
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold"
              onClick={() => navigate('/leaderboard')}
            >
              View Leaderboard
            </motion.button>
          </div>
        </div>
      );
    }
    
    const currentItem = gameData[currentQuestion];
    
    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="font-bold">Question:</span> {currentQuestion + 1}/{gameData.length}
          </div>
          <div>
            <span className="font-bold">Score:</span> {score}
          </div>
          <div className={`font-bold ${timeLeft < 10 ? 'text-red-600' : ''}`}>
            Time: {timeLeft}s
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          {renderGameQuestion(currentItem)}
        </div>
        
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="flex-1 px-4 py-2 rounded-l-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Enter your answer..."
              onKeyPress={(e) => e.key === 'Enter' && handleSubmitAnswer()}
            />
            <button
              onClick={handleSubmitAnswer}
              className="bg-blue-600 text-white p-2 px-4 rounded-r-lg"
            >
              Submit
            </button>
          </div>
        </div>
        
        <div className="flex justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-600 text-white px-4 py-2 rounded-lg"
            onClick={showHint}
            disabled={hintUsed}
          >
            {hintUsed ? 'Hint Used' : 'Use Hint'}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg"
            onClick={toggleMute}
          >
            {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
          </motion.button>
        </div>
      </div>
    );
  };
  
  const renderGameQuestion = (item) => {
    if (!item) return null;
    
    switch(gameMode) {
      case 'silhouette':
        return (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Who is this character?</h3>
            <div className="relative w-64 h-64 mx-auto mb-4 overflow-hidden rounded-lg">
              <img 
                src={revealLevel === 0 ? item.silhouette : item.image} 
                alt="Character" 
                className={`w-full h-full object-cover ${revealLevel < 3 ? 'filter blur-sm' : ''}`}
                style={{ filter: `blur(${3 - revealLevel}px)` }}
              />
            </div>
          </div>
        );
        
      case 'devil-fruit':
        return (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Who has this Devil Fruit?</h3>
            <div className="relative w-64 h-64 mx-auto mb-4 overflow-hidden rounded-lg">
              <img src={item.devilFruitImage} alt="Devil Fruit" className="w-full h-full object-cover" />
            </div>
            <p className="text-gray-300 mb-2">Bonus points if you can name their crew!</p>
          </div>
        );
        
        
      case 'bounty-poster':
        return (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Who is on this bounty poster?</h3>
            <div className="relative w-64 h-64 mx-auto mb-4 overflow-hidden rounded-lg">
              <img 
                src={item.tornPoster} 
                alt="Bounty Poster" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        );
        
      case 'gear-form':
        return (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Who is this and what form are they using?</h3>
            <div className="relative w-64 h-64 mx-auto mb-4 overflow-hidden rounded-lg">
              <img src={item.image} alt="Character Form" className="w-full h-full object-cover" />
            </div>
          </div>
        );
        
      case 'crew':
        return (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Which crew do these silhouettes belong to?</h3>
            <div className="flex justify-center space-x-4 mb-4">
              {item.members.map((member, index) => (
                <div key={index} className="w-20 h-20 overflow-hidden rounded-lg bg-gray-700">
                  <img src={member.silhouette} alt="Crew Member" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'manga-panel':
        return (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Who is in this manga panel?</h3>
            <div className="relative w-64 h-64 mx-auto mb-4 overflow-hidden rounded-lg">
              <img 
                src={revealLevel < 2 ? item.zoomedPanel : item.fullPanel} 
                alt="Manga Panel" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        );
        
      case 'fusion':
        return (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Name BOTH characters in this fusion!</h3>
            <div className="relative w-64 h-64 mx-auto mb-4 overflow-hidden rounded-lg">
              <img src={item.fusion.image} alt="Character Fusion" className="w-full h-full object-cover" />
            </div>
            <p className="text-gray-300 mb-2">Double points for getting both characters correct!</p>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-xl"
    >
      <div className="flex items-center mb-6">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="mr-4 bg-red-600 p-2 rounded-full"
          onClick={() => navigate('/game-modes')}
        >
          <FaArrowLeft size={20} />
        </motion.button>
        <h1 className="text-3xl font-bold">
          {gameMode === 'silhouette' && 'Classic Silhouette Guess'}
          {gameMode === 'devil-fruit' && 'Distorted Devil Fruit Mode'}
          {gameMode === 'bounty-poster' && 'Bounty Poster Puzzle'}
          {gameMode === 'gear-form' && 'Gear/Form Guess'}
          {gameMode === 'crew' && 'Crew-only Guess'}
          {gameMode === 'manga-panel' && 'Manga Panel Zoom'}
          {gameMode === 'fusion' && 'Fusion/Glitch Mode'}
        </h1>
      </div>
      
      {renderGameContent()}
    </motion.div>
  );
};

export default GameInterface;