import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaRedo, FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { useLanguage } from '../../contexts/LanguageContext'

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
type Position = { x: number; y: number }

const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }]
const INITIAL_DIRECTION: Direction = 'RIGHT'
const GAME_SPEED = 150

export const SnakeGame: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { t } = useLanguage()
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION)
  const [food, setFood] = useState<Position>({ x: 15, y: 15 })
  const [isPlaying, setIsPlaying] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)

  const generateFood = useCallback((): Position => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    }
  }, [])

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setDirection(INITIAL_DIRECTION)
    setFood(generateFood())
    setIsPlaying(false)
    setIsGameOver(false)
    setScore(0)
  }

  const moveSnake = useCallback(() => {
    if (!isPlaying || isGameOver) return

    setSnake(prevSnake => {
      const head = prevSnake[0]
      let newHead: Position

      switch (direction) {
        case 'UP':
          newHead = { x: head.x, y: head.y - 1 }
          break
        case 'DOWN':
          newHead = { x: head.x, y: head.y + 1 }
          break
        case 'LEFT':
          newHead = { x: head.x - 1, y: head.y }
          break
        case 'RIGHT':
          newHead = { x: head.x + 1, y: head.y }
          break
      }

      // Check wall collision
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        setIsGameOver(true)
        setIsPlaying(false)
        if (score > highScore) {
          setHighScore(score)
          localStorage.setItem('snakeHighScore', score.toString())
        }
        return prevSnake
      }

      // Check self collision
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true)
        setIsPlaying(false)
        if (score > highScore) {
          setHighScore(score)
          localStorage.setItem('snakeHighScore', score.toString())
        }
        return prevSnake
      }

      const newSnake = [newHead, ...prevSnake]

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setFood(generateFood())
        setScore(s => s + 10)
        return newSnake
      }

      newSnake.pop()
      return newSnake
    })
  }, [direction, food, isPlaying, isGameOver, score, highScore, generateFood])

  useEffect(() => {
    const savedHighScore = localStorage.getItem('snakeHighScore')
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore))
    }
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) {
        if (e.key === ' ') {
          setIsPlaying(true)
        }
        return
      }

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault()
          setDirection(prev => prev !== 'DOWN' ? 'UP' : prev)
          break
        case 'ArrowDown':
          e.preventDefault()
          setDirection(prev => prev !== 'UP' ? 'DOWN' : prev)
          break
        case 'ArrowLeft':
          e.preventDefault()
          setDirection(prev => prev !== 'RIGHT' ? 'LEFT' : prev)
          break
        case 'ArrowRight':
          e.preventDefault()
          setDirection(prev => prev !== 'LEFT' ? 'RIGHT' : prev)
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isPlaying])

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, GAME_SPEED)
    return () => clearInterval(gameLoop)
  }, [moveSnake])

  const handleDirectionClick = (newDirection: Direction) => {
    if (!isPlaying) {
      setIsPlaying(true)
    }

    setDirection(prev => {
      if (newDirection === 'UP' && prev !== 'DOWN') return 'UP'
      if (newDirection === 'DOWN' && prev !== 'UP') return 'DOWN'
      if (newDirection === 'LEFT' && prev !== 'RIGHT') return 'LEFT'
      if (newDirection === 'RIGHT' && prev !== 'LEFT') return 'RIGHT'
      return prev
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
            {t.game.title}
          </h2>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FaTimes className="text-xl text-gray-600 dark:text-gray-400" />
          </motion.button>
        </div>

        {/* Scores */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg p-4 text-white text-center">
            <div className="text-sm opacity-90">{t.game.score}</div>
            <div className="text-3xl font-bold">{score}</div>
          </div>
          <div className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-lg p-4 text-white text-center">
            <div className="text-sm opacity-90">{t.game.highScore}</div>
            <div className="text-3xl font-bold">{highScore}</div>
          </div>
        </div>

        {/* Game Board */}
        <div className="relative bg-gray-100 dark:bg-gray-900 rounded-lg p-2 mb-4">
          <div
            style={{
              width: GRID_SIZE * CELL_SIZE,
              height: GRID_SIZE * CELL_SIZE,
              position: 'relative',
              margin: '0 auto'
            }}
            className="bg-white dark:bg-gray-800 rounded-lg border-4 border-gray-300 dark:border-gray-600"
          >
            {/* Snake */}
            {snake.map((segment, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  left: segment.x * CELL_SIZE,
                  top: segment.y * CELL_SIZE,
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  borderRadius: index === 0 ? '4px' : '2px'
                }}
                className={`${
                  index === 0
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500'
                    : 'bg-primary-400 dark:bg-primary-600'
                } transition-all duration-100`}
              />
            ))}

            {/* Food */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              style={{
                position: 'absolute',
                left: food.x * CELL_SIZE,
                top: food.y * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE
              }}
              className="bg-red-500 rounded-full"
            />

            {/* Game Over Overlay */}
            <AnimatePresence>
              {isGameOver && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg"
                >
                  <div className="text-center text-white">
                    <div className="text-4xl mb-4">😵</div>
                    <div className="text-2xl font-bold mb-4">{t.game.gameOver}</div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetGame}
                      className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg font-semibold flex items-center gap-2 mx-auto"
                    >
                      <FaRedo />
                      {t.game.restart}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Start Screen */}
            <AnimatePresence>
              {!isPlaying && !isGameOver && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg"
                >
                  <div className="text-center text-white">
                    <div className="text-4xl mb-4">🐍</div>
                    <div className="text-lg mb-4">{t.game.instructions}</div>
                    <div className="text-sm opacity-75">Press SPACE or click arrows to start</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-3 gap-2">
          <div className="col-start-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleDirectionClick('UP')}
              className="w-full p-4 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <FaArrowUp className="mx-auto text-xl" />
            </motion.button>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleDirectionClick('LEFT')}
            className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <FaArrowLeft className="mx-auto text-xl" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleDirectionClick('DOWN')}
            className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <FaArrowDown className="mx-auto text-xl" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => handleDirectionClick('RIGHT')}
            className="p-4 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <FaArrowRight className="mx-auto text-xl" />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}
