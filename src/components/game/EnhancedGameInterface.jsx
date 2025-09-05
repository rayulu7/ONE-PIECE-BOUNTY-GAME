import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaVolumeUp, FaVolumeMute, FaKeyboard, FaLightbulb, FaFire, FaPuzzlePiece } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import GameStats from '../ui/GameStats';
import { answerMatcher } from '../../utils/answerMatcher';
import { createStreakManager } from '../../utils/streakManager';

// Import all game data
import silhouetteData from '../../data/silhouetteData';
import devilFruitData from '../../data/devilFruitData';
import bountyPosterData from '../../data/bountyPosterData';
import gearFormData from '../../data/gearFormData';
import crewData from '../../data/crewData';
import mangaPanelData from '../../data/mangaPanelData';
import fusionData from '../../data/fusionData';

const EnhancedGameInterface = () => {
  const { mode } = useParams();
  const navigate = useNavigate();
  const { user, updateBounty } = useAuth();
  const audioRef = useRef(null);
  
  // Game state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameData, setGameData] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [revealLevel, setRevealLevel] = useState(0);
  const [answer, setAnswer] = useState('');
  const [crewAnswer, setCrewAnswer] = useState('');
  const [formAnswer, setFormAnswer] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [gameStreak, setGameStreak] = useState(0);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [puzzlePieces, setPuzzlePieces] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(5); // For manga panel zoom
  const [streakManager, setStreakManager] = useState(null);
  
  // Game mode configurations
  const gameModeConfig = {
    'silhouette': {
      name: 'Classic Silhouette Guess',
      description: 'Progressive reveal of character silhouettes',
      maxRevealStages: 4,
      timePerReveal: 5
    },
    'devil-fruit': {
      name: 'Distorted Devil Fruit Mode', 
      description: 'Identify character by their Devil Fruit',
      crewBonus: true
    },
    'bounty-poster': {
      name: 'Bounty Poster Puzzle',
      description: 'Reconstruct torn bounty posters',
      hasPuzzle: true
    },
    'gear-form': {
      name: 'Gear/Form Guess',
      description: 'Identify character and their form',
      requiresForm: true
    },
    'crew': {
      name: 'Crew-only Guess',
      description: 'Identify crew from member silhouettes'
    },
    'manga-panel': {
      name: 'Manga Panel Zoom',
      description: 'Zoomed manga panels that reveal slowly',
      hasZoom: true
    },
    'fusion': {
      name: 'Fusion/Glitch Mode',
      description: 'Identify both characters in the fusion',
      requiresDouble: true,
      doubleScore: true
    }
  };

  // Initialize streak manager
  useEffect(() => {
    if (user?.uid) {
      const sm = createStreakManager(user.uid);
      setStreakManager(sm);
      setDailyStreak(sm.getCurrentStreak());
    }
  }, [user]);

  // Load appropriate game data
  useEffect(() => {
    let data;
    switch(mode) {
      case 'silhouette': data = silhouetteData; break;
      case 'devil-fruit': data = devilFruitData; break;
      case 'bounty-poster': data = bountyPosterData; break;
      case 'gear-form': data = gearFormData; break;
      case 'crew': data = crewData; break;
      case 'manga-panel': data = mangaPanelData; break;
      case 'fusion': data = fusionData; break;
      default:
        navigate('/game-modes');
        return;
    }
    
    // Shuffle and select 10 questions
    const shuffled = [...data].sort(() => 0.5 - Math.random());
    setGameData(shuffled.slice(0, 10));
    
    // Initialize puzzle for bounty poster mode
    if (mode === 'bounty-poster') {
      setPuzzlePieces(generatePuzzlePieces());
    }
  }, [mode, navigate]);

  // Enhanced timer with mode-specific behaviors
  useEffect(() => {
    if (!gameStarted || gameEnded) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
      
      // Progressive reveal for silhouette mode
      if (mode === 'silhouette' && timeLeft % 5 === 0 && revealLevel < 4) {
        setRevealLevel(prev => prev + 1);
      }
      
      // Progressive zoom out for manga panel mode
      if (mode === 'manga-panel' && timeLeft % 4 === 0 && zoomLevel > 1) {
        setZoomLevel(prev => prev - 1);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [gameStarted, gameEnded, timeLeft, mode, revealLevel, zoomLevel]);

  const generatePuzzlePieces = () => {
    // Generate 9 puzzle pieces (3x3 grid)
    return Array.from({ length: 9 }, (_, i) => ({
      id: i,
      position: i,
      isRevealed: i === 4, // Center piece starts revealed
      correctPosition: i
    }));
  };


  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(30);
    setRevealLevel(0);
    setZoomLevel(5);
    
    // Update daily streak
    if (streakManager) {
      const newStreak = streakManager.updateStreak();
      setDailyStreak(newStreak);
      streakManager.updateTodayGameMode(mode);
      
      if (newStreak > 1) {
        toast.success(`🔥 ${newStreak} day streak! Bonus berries incoming!`);
      }
    }
    
    toast.success(`${gameModeConfig[mode].name} started! Good luck!`);
  };

  const handleTimeUp = () => {
    toast.error('Time\'s up!');
    setGameStreak(0); // Break game streak on timeout
    goToNextQuestion(0);
  };

  const handleSubmitAnswer = () => {
    if (!answer.trim() && !crewAnswer.trim()) {
      toast.warning('Please enter an answer!');
      return;
    }
    
    checkAnswer(answer, crewAnswer, formAnswer);
  };


  // Enhanced answer checking with mode-specific logic
  const checkAnswer = (userAnswer, userCrewAnswer = '', userFormAnswer = '') => {
    const currentItem = gameData[currentQuestion];
    let isCorrect = false;
    let pointsEarned = 0;
    let correctAnswers = [];
    
    switch(mode) {
      case 'silhouette':
      case 'bounty-poster':
      case 'manga-panel':
        const matchResult = answerMatcher.matchesCharacter(userAnswer, currentItem.character);
        isCorrect = matchResult.match;
        if (isCorrect) {
          pointsEarned = calculatePoints(currentItem.points);
          correctAnswers = [currentItem.character];
          if (matchResult.confidence < 100) {
            toast.info(`🎯 Nice! Recognized "${userAnswer}" as ${currentItem.character} (${matchResult.confidence}% match)`);
          }
        }
        break;
        
      case 'devil-fruit':
        const charMatch = answerMatcher.matchesCharacter(userAnswer, currentItem.character);
        const crewMatch = answerMatcher.matchesCharacter(userCrewAnswer || userAnswer, currentItem.crew);
        
        if (charMatch.match && crewMatch.match) {
          isCorrect = true;
          pointsEarned = calculatePoints(currentItem.points.character + currentItem.points.crew);
          correctAnswers = [currentItem.character, currentItem.crew];
          toast.success('🎉 Perfect! Character + Crew bonus!');
        } else if (charMatch.match) {
          isCorrect = true;
          pointsEarned = calculatePoints(currentItem.points.character);
          correctAnswers = [currentItem.character];
        }
        break;
        
      case 'gear-form':
        const charCorrect = userAnswer.toLowerCase().includes(currentItem.character.toLowerCase());
        const formCorrect = userFormAnswer.toLowerCase().includes(currentItem.form.toLowerCase()) ||
                           userAnswer.toLowerCase().includes(currentItem.form.toLowerCase());
        
        if (charCorrect && formCorrect) {
          isCorrect = true;
          pointsEarned = calculatePoints(currentItem.points);
          correctAnswers = [currentItem.character, currentItem.form];
        }
        break;
        
      case 'crew':
        isCorrect = userAnswer.toLowerCase().includes(currentItem.crew.toLowerCase());
        if (isCorrect) {
          pointsEarned = calculatePoints(currentItem.points);
          correctAnswers = [currentItem.crew];
        }
        break;
        
      case 'fusion':
        const char1Correct = userAnswer.toLowerCase().includes(currentItem.fusion.character1.toLowerCase());
        const char2Correct = userAnswer.toLowerCase().includes(currentItem.fusion.character2.toLowerCase());
        
        if (char1Correct && char2Correct) {
          isCorrect = true;
          pointsEarned = calculatePoints(currentItem.points * 2); // Double score
          correctAnswers = [currentItem.fusion.character1, currentItem.fusion.character2];
          toast.success('🎯 FUSION MASTER! Double Score!');
        } else if (char1Correct || char2Correct) {
          isCorrect = true;
          pointsEarned = Math.floor(calculatePoints(currentItem.points) / 2);
          correctAnswers = [char1Correct ? currentItem.fusion.character1 : currentItem.fusion.character2];
          toast.success('👍 Half correct! Half points!');
        }
        break;
        
      default:
        break;
    }
    
    if (isCorrect) {
      setGameStreak(prev => prev + 1);
      setScore(prev => prev + pointsEarned);
      
      // Game streak bonuses (within single game session)
      const gameStreakBonus = Math.floor(gameStreak / 3) * 50;
      
      // Daily streak bonus (from streak manager)
      const dailyStreakBonus = streakManager ? Math.floor(pointsEarned * (streakManager.getStreakBonus() - 1)) : 0;
      
      let totalBonus = gameStreakBonus + dailyStreakBonus;
      
      if (gameStreakBonus > 0) {
        toast.success(`🔥 ${gameStreak + 1} GAME STREAK! +${gameStreakBonus} bonus!`);
      }
      
      if (dailyStreakBonus > 0) {
        toast.success(`📅 ${dailyStreak} DAY STREAK! +${dailyStreakBonus} daily bonus!`);
      }
      
      if (totalBonus > 0) {
        setScore(prev => prev + totalBonus);
        pointsEarned += totalBonus;
      }
      
      toast.success(`✅ Correct! +${pointsEarned} points`);
    } else {
      setGameStreak(0);
      toast.error(`❌ Incorrect! Correct answer: ${currentItem.character || correctAnswers.join(' + ')}`);
    }
    
    goToNextQuestion(pointsEarned);
  };

  // Enhanced points calculation with mode-specific bonuses
  const calculatePoints = (basePoints) => {
    let timeBonus = Math.floor((timeLeft / 30) * (basePoints * 0.5));
    let revealPenalty = 0;
    let hintPenalty = hintUsed ? Math.floor(basePoints * 0.2) : 0;
    
    // Mode-specific calculations
    if (mode === 'silhouette') {
      // Less points for each reveal stage
      revealPenalty = revealLevel * Math.floor(basePoints * 0.1);
    } else if (mode === 'manga-panel') {
      // More points for guessing at high zoom
      const zoomBonus = (6 - zoomLevel) * Math.floor(basePoints * 0.15);
      timeBonus += zoomBonus;
    }
    
    return Math.max(Math.floor(basePoints + timeBonus - revealPenalty - hintPenalty), 25);
  };

  const goToNextQuestion = (pointsEarned) => {
    if (currentQuestion < gameData.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(30);
      setRevealLevel(0);
      setZoomLevel(5);
      setAnswer('');
      setCrewAnswer('');
      setFormAnswer('');
      setHintUsed(false);
      if (mode === 'bounty-poster') {
        setPuzzlePieces(generatePuzzlePieces());
      }
    } else {
      endGame(pointsEarned);
    }
  };

  const showHint = () => {
    if (!hintUsed && gameData[currentQuestion]?.hints) {
      setHintUsed(true);
      const randomHint = gameData[currentQuestion].hints[Math.floor(Math.random() * gameData[currentQuestion].hints.length)];
      toast.info(`💡 Hint: ${randomHint}`, { autoClose: 5000 });
    } else {
      toast.warning('No more hints available!');
    }
  };


  const handlePuzzlePieceClick = (pieceId) => {
    if (mode === 'bounty-poster') {
      setPuzzlePieces(prev => 
        prev.map(piece => 
          piece.id === pieceId ? { ...piece, isRevealed: true } : piece
        )
      );
    }
  };

  const endGame = async (finalQuestionPoints) => {
    setGameEnded(true);
    const finalScore = score + finalQuestionPoints;

    // Convert score to bounty with both streak bonuses
    const gameStreakMultiplier = 1 + (gameStreak * 0.05); // 5% per game streak
    const dailyStreakMultiplier = streakManager ? streakManager.getStreakBonus() : 1;
    const totalMultiplier = gameStreakMultiplier * dailyStreakMultiplier;
    const bountyEarned = Math.floor(finalScore * 1000 * totalMultiplier);

    try {
      await updateBounty(bountyEarned);

      // Show treasure chest animation for high scores
      if (bountyEarned > 50000) {
        toast.success(
          <div className="flex items-center">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 1, repeat: 2 }}
              className="mr-2"
            >
              💰
            </motion.div>
            <span>TREASURE CHEST UNLOCKED!</span>
          </div>,
          { autoClose: 6000 }
        );
      }

      toast.success(`🎉 Game Over! Final Score: ${finalScore}`, { autoClose: 5000 });
      toast.success(`💰 Bounty Earned: ${bountyEarned.toLocaleString()} berries!`, { autoClose: 5000 });

      if (gameStreak >= 5) {
        toast.success(
          <div className="flex items-center">
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.5, repeat: 3 }}
              className="mr-2"
            >
              🔥
            </motion.div>
            <span>Amazing {gameStreak} game streak! You're on fire!</span>
          </div>,
          { autoClose: 5000 }
        );
      }

      if (dailyStreak >= 3) {
        toast.success(
          <div className="flex items-center">
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 1, repeat: 2 }}
              className="mr-2"
            >
              📅
            </motion.div>
            <span>{dailyStreak} day streak! Daily bonus applied!</span>
          </div>,
          { autoClose: 5000 }
        );
      }
    } catch (error) {
      toast.error('Failed to update bounty');
      console.error(error);
    }
  };

  // Render game content based on current state
  const renderGameContent = () => {
    if (!gameData.length) {
      return (
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-xl">Loading game data...</p>
        </div>
      );
    }
    
    if (!gameStarted) {
      return (
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-yellow-500">{gameModeConfig[mode].name}</h2>
          <p className="text-lg mb-6 text-gray-300">{gameModeConfig[mode].description}</p>
          <div className="bg-gray-800 rounded-lg p-6 mb-6 border-2 border-yellow-500">
            <h3 className="text-xl font-bold mb-4">Game Rules:</h3>
            <ul className="text-left space-y-2">
              <li>• 30 seconds per question</li>
              <li>• Faster answers = higher points</li>
              <li>• Build streaks for bonus points</li>
              <li>• Use hints wisely (point penalty)</li>
              {mode === 'devil-fruit' && <li>• Bonus points for naming the crew</li>}
              {mode === 'gear-form' && <li>• Must identify both character AND form</li>}
              {mode === 'fusion' && <li>• Name BOTH characters for double score</li>}
            </ul>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-xl shadow-lg"
            onClick={startGame}
          >
            🚀 START ADVENTURE
          </motion.button>
        </motion.div>
      );
    }
    
    if (gameEnded) {
      return (
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4 text-yellow-500">🎉 ADVENTURE COMPLETE! 🎉</h2>
          <div className="bg-gray-800 rounded-lg p-6 mb-6 border-2 border-yellow-500">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-white">{score}</p>
                <p className="text-sm text-gray-400">Final Score</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-400">{(score * 1000 * (1 + streak * 0.1)).toLocaleString()}</p>
                <p className="text-sm text-gray-400">Berries Earned</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-red-400">{streak}</p>
                <p className="text-sm text-gray-400">Max Streak</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-400">{Math.round((score / (gameData.length * 300)) * 100)}%</p>
                <p className="text-sm text-gray-400">Performance</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold"
              onClick={() => navigate('/game-modes')}
            >
              🎮 Play Another Mode
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold"
              onClick={() => navigate('/leaderboard')}
            >
              🏆 View Leaderboard
            </motion.button>
          </div>
        </motion.div>
      );
    }
    
    const currentItem = gameData[currentQuestion];
    
    return (
      <div>
        <GameStats 
          currentQuestion={currentQuestion}
          totalQuestions={gameData.length}
          score={score}
          timeLeft={timeLeft}
          gameStreak={gameStreak}
          dailyStreak={dailyStreak}
          className="mb-6"
        />
        
        {/* Streak Display with Character Animations */}
        {gameStreak > 0 && (
          <motion.div
            className="text-center mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
          >
            <div className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-full relative overflow-hidden">
              {/* Luffy stretching animation for high streaks */}
              {gameStreak >= 5 && (
                <motion.div
                  className="absolute -right-2 -top-2 text-2xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 15, -15, 0]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  🏃‍♂️
                </motion.div>
              )}

              {/* Zoro sword effect for very high streaks */}
              {gameStreak >= 8 && (
                <motion.div
                  className="absolute -left-3 -bottom-1 text-xl"
                  animate={{
                    x: [-10, 10, -10],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  ⚔️
                </motion.div>
              )}

              <motion.div
                animate={gameStreak >= 3 ? {
                  scale: [1, 1.1, 1],
                  textShadow: ['0 0 5px rgba(255,255,255,0.5)', '0 0 10px rgba(255,255,255,0.8)', '0 0 5px rgba(255,255,255,0.5)']
                } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <FaFire className="mr-2" />
                <span className="font-bold">{gameStreak} STREAK!</span>
              </motion.div>
            </div>
          </motion.div>
        )}
        
        <div className="bg-gray-800 rounded-lg p-6 mb-6 border-2 border-yellow-500">
          {renderGameQuestion(currentItem)}
        </div>
        
        {/* Answer Input Section */}
        <div className="space-y-4 mb-6">
          {/* Main Answer Input */}
          <div className="flex items-center">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="flex-1 px-4 py-3 rounded-l-lg border-2 border-gray-300 focus:outline-none focus:border-yellow-500 text-black"
              placeholder={mode === 'fusion' ? "Enter both characters (e.g. Zoro Usopp)" : "Enter character name..."}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmitAnswer()}
            />
            <button
              onClick={() => setInputMethod('keyboard')}
              className="bg-gray-700 text-white p-3 border-2 border-gray-300"
              title="Keyboard Input"
            >
              <FaKeyboard size={20} />
            </button>
            <button
              onClick={handleSubmitAnswer}
              className="bg-yellow-600 hover:bg-yellow-700 text-white p-3 px-6 rounded-r-lg font-bold border-2 border-yellow-600"
            >
              SUBMIT
            </button>
          </div>
          
          {/* Crew Answer for Devil Fruit Mode */}
          {mode === 'devil-fruit' && (
            <div className="flex items-center">
              <input
                type="text"
                value={crewAnswer}
                onChange={(e) => setCrewAnswer(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-black"
                placeholder="Enter crew name for bonus points..."
                onKeyPress={(e) => e.key === 'Enter' && handleSubmitAnswer()}
              />
              <span className="ml-2 text-sm text-blue-400">+50 points</span>
            </div>
          )}
          
          {/* Form Answer for Gear/Form Mode */}
          {mode === 'gear-form' && (
            <div className="flex items-center">
              <input
                type="text"
                value={formAnswer}
                onChange={(e) => setFormAnswer(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-green-500 text-black"
                placeholder="Enter the form/gear (e.g. Gear 2, Enma, Raid Suit)..."
                onKeyPress={(e) => e.key === 'Enter' && handleSubmitAnswer()}
              />
              <span className="ml-2 text-sm text-green-400">Required</span>
            </div>
          )}
        </div>
        
        {/* Game Controls */}
        <div className="flex justify-between items-center flex-wrap gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg flex items-center"
            onClick={showHint}
            disabled={hintUsed}
          >
            <FaLightbulb className="mr-2" />
            {hintUsed ? 'Hint Used' : 'Get Hint'}
          </motion.button>
          
          
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
          </motion.button>
        </div>
      </div>
    );
  };

  // Render specific game question based on mode
  const renderGameQuestion = (item) => {
    if (!item) return null;
    
    switch(mode) {
      case 'silhouette':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-yellow-500">Who is this character?</h3>
            <motion.div 
              className="relative w-80 h-80 mx-auto mb-4 overflow-hidden rounded-lg border-4 border-yellow-500"
              key={currentQuestion}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence>
                {item.revealStages && (
                  <motion.img 
                    src={revealLevel >= 4 ? item.image : (item.revealStages[revealLevel] || item.silhouette)}
                    alt="Character"
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
            <div className="text-sm text-gray-400">
              Reveal Stage: {revealLevel}/4 • Faster guess = More points!
            </div>
          </div>
        );
        
      case 'devil-fruit':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-purple-500">Who has this Devil Fruit?</h3>
            <motion.div 
              className="relative w-80 h-80 mx-auto mb-4 overflow-hidden rounded-lg border-4 border-purple-500"
              key={currentQuestion}
              initial={{ rotateY: -90 }}
              animate={{ rotateY: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src={item.distortedImage || item.image} 
                alt="Devil Fruit" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="bg-purple-900 rounded-lg p-3 mb-4">
              <p className="text-purple-200 font-bold">{item.devilFruit}</p>
            </div>
            <p className="text-gray-300">💡 Bonus points if you can name their crew!</p>
          </div>
        );
        
        
      case 'bounty-poster':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-yellow-500">Reconstruct this Bounty Poster!</h3>
            <div className="grid grid-cols-3 gap-2 w-80 h-80 mx-auto mb-4 border-4 border-yellow-500 rounded-lg overflow-hidden">
              {puzzlePieces.map((piece, index) => (
                <motion.div
                  key={piece.id}
                  className={`relative cursor-pointer ${
                    piece.isRevealed ? 'opacity-100' : 'opacity-30'
                  }`}
                  onClick={() => handlePuzzlePieceClick(piece.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div 
                    className="w-full h-full bg-cover bg-center flex items-center justify-center"
                    style={{ 
                      backgroundImage: piece.isRevealed ? `url(${item.tornPoster})` : 'none',
                      backgroundPosition: `${(index % 3) * -100}% ${Math.floor(index / 3) * -100}%`,
                      backgroundColor: piece.isRevealed ? 'transparent' : '#374151'
                    }}
                  >
                    {!piece.isRevealed && (
                      <FaPuzzlePiece className="text-gray-500 text-2xl" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-gray-300">🧩 Click pieces to reveal them!</p>
          </div>
        );
        
      case 'gear-form':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-red-500">Who is this and what form?</h3>
            <motion.div 
              className="relative w-80 h-80 mx-auto mb-4 overflow-hidden rounded-lg border-4 border-red-500"
              key={currentQuestion}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src={item.image} 
                alt="Character Form" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="bg-red-900 rounded-lg p-3 mb-4">
              <p className="text-red-200">⚡ Must identify BOTH character AND form!</p>
            </div>
          </div>
        );
        
      case 'crew':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-indigo-500">Which crew do these belong to?</h3>
            <div className="flex justify-center space-x-4 mb-4">
              {item.members?.slice(0, 3).map((member, index) => (
                <motion.div 
                  key={index}
                  className="w-24 h-24 overflow-hidden rounded-lg bg-gray-700 border-2 border-indigo-500"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <img 
                    src={member.silhouette} 
                    alt="Crew Member" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
            <p className="text-gray-300">🏴‍☠️ Three crew member silhouettes!</p>
          </div>
        );
        
      case 'manga-panel':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-500">Who is in this manga panel?</h3>
            <motion.div 
              className="relative w-80 h-80 mx-auto mb-4 overflow-hidden rounded-lg border-4 border-gray-500"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center'
              }}
            >
              <img 
                src={zoomLevel > 2 ? item.zoomedPanel : item.fullPanel}
                alt="Manga Panel" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="text-sm text-gray-400">
              Zoom Level: {zoomLevel}/5 • Panel zooming out automatically!
            </div>
          </div>
        );
        
      case 'fusion':
        return (
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-pink-500">Name BOTH characters in this fusion!</h3>
            <motion.div 
              className="relative w-80 h-80 mx-auto mb-4 overflow-hidden rounded-lg border-4 border-pink-500"
              key={currentQuestion}
              animate={{ 
                boxShadow: ['0 0 20px #ec4899', '0 0 40px #ec4899', '0 0 20px #ec4899']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <img 
                src={item.fusion?.image} 
                alt="Character Fusion" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20"></div>
            </motion.div>
            <div className="bg-pink-900 rounded-lg p-3 mb-4">
              <p className="text-pink-200 font-bold">🎯 FUSION MODE: Double points for both characters!</p>
              <p className="text-pink-300 text-sm">Features from: {item.fusion?.feature1} + {item.fusion?.feature2}</p>
            </div>
          </div>
        );
        
      default:
        return <div>Unknown game mode</div>;
    }
  };

  // Pirate-themed background elements
  const PirateGameBackground = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Animated waves */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-blue-900/20 to-transparent">
        <motion.div
          className="absolute bottom-0 left-0 w-full h-12 bg-blue-800/15"
          animate={{ x: [-20, 20, -20] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-2 left-0 w-full h-6 bg-blue-700/10"
          animate={{ x: [20, -20, 20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Floating cannon smoke */}
      {gameStreak > 2 && (
        <motion.div
          className="absolute top-20 right-20 w-16 h-16 bg-gray-400/20 rounded-full"
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="absolute inset-2 bg-gray-300/30 rounded-full animate-pulse"></div>
        </motion.div>
      )}

      {/* Treasure particles for high scores */}
      {score > 500 && (
        <>
          <motion.div
            className="absolute top-32 left-16 text-yellow-400 text-2xl"
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: 0 }}
          >
            💰
          </motion.div>
          <motion.div
            className="absolute top-40 right-32 text-yellow-400 text-xl"
            animate={{
              y: [0, -15, 0],
              opacity: [0, 1, 0]
            }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
          >
            🪙
          </motion.div>
        </>
      )}

      {/* Pirate ship silhouette */}
      <motion.div
        className="absolute bottom-16 left-10 opacity-5"
        animate={{ x: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="w-20 h-10 bg-black rounded-t-full transform rotate-6"></div>
        <div className="absolute -top-1 left-1 w-18 h-8 bg-gray-800 rounded-t-full"></div>
      </motion.div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/10 to-gray-800 text-white p-4 relative"
    >
      <PirateGameBackground />
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center mb-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="mr-4 bg-red-600 hover:bg-red-700 p-3 rounded-full"
            onClick={() => navigate('/game-modes')}
          >
            <FaArrowLeft size={20} />
          </motion.button>
          <h1 className="text-3xl font-bold text-yellow-500">
            {gameModeConfig[mode]?.name || 'Unknown Mode'}
          </h1>
        </div>
        
        <div className="bg-gray-800 rounded-xl shadow-xl p-6 border-2 border-yellow-500">
          {renderGameContent()}
        </div>
      </div>
      
      <audio ref={audioRef} preload="metadata" />
    </motion.div>
  );
};

export default EnhancedGameInterface;
