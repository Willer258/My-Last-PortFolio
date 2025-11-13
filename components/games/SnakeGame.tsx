import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useStore } from '../../store/useStore'
import { FiX } from 'react-icons/fi'

type Position = { x: number; y: number }
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SNAKE: Position[] = [{ x: 10, y: 10 }]
const INITIAL_DIRECTION: Direction = 'RIGHT'
const GAME_SPEED = 150

export const SnakeGame: React.FC = () => {
  const { t } = useTranslation('common')
  const { closeGame } = useStore()
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE)
  const [food, setFood] = useState<Position>({ x: 15, y: 15 })
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION)
  const [nextDirection, setNextDirection] = useState<Direction>(INITIAL_DIRECTION)
  const [isGameOver, setIsGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      }
    } while (currentSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }, [])

  const resetGame = () => {
    setSnake(INITIAL_SNAKE)
    setFood(generateFood(INITIAL_SNAKE))
    setDirection(INITIAL_DIRECTION)
    setNextDirection(INITIAL_DIRECTION)
    setIsGameOver(false)
    setScore(0)
    setIsPlaying(true)
  }

  const moveSnake = useCallback(() => {
    if (isGameOver || !isPlaying) return

    setDirection(nextDirection)

    setSnake((prevSnake) => {
      const head = prevSnake[0]
      let newHead: Position

      switch (nextDirection) {
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
      if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
        setIsGameOver(true)
        setIsPlaying(false)
        if (score > highScore) setHighScore(score)
        return prevSnake
      }

      // Check self collision
      if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true)
        setIsPlaying(false)
        if (score > highScore) setHighScore(score)
        return prevSnake
      }

      const newSnake = [newHead, ...prevSnake]

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((prev) => prev + 10)
        setFood(generateFood(newSnake))
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [nextDirection, isGameOver, isPlaying, food, generateFood, score, highScore])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return

      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setNextDirection('UP')
          break
        case 'ArrowDown':
          if (direction !== 'UP') setNextDirection('DOWN')
          break
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setNextDirection('LEFT')
          break
        case 'ArrowRight':
          if (direction !== 'LEFT') setNextDirection('RIGHT')
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [direction, isPlaying])

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, GAME_SPEED)
    return () => clearInterval(gameLoop)
  }, [moveSnake])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={closeGame}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-2xl max-w-2xl w-full"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                {t('games.snake.title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {t('games.snake.controls')}
              </p>
            </div>
            <button
              onClick={closeGame}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Score */}
          <div className="flex justify-between mb-4">
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('games.snake.score')}</div>
              <div className="text-2xl font-bold text-primary-500">{score}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">{t('games.snake.highScore')}</div>
              <div className="text-2xl font-bold text-secondary-500">{highScore}</div>
            </div>
          </div>

          {/* Game Board */}
          <div className="relative mx-auto mb-4" style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}>
            <div
              className="border-4 border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800"
              style={{ width: GRID_SIZE * CELL_SIZE, height: GRID_SIZE * CELL_SIZE }}
            >
              {/* Snake */}
              {snake.map((segment, index) => (
                <motion.div
                  key={`${segment.x}-${segment.y}-${index}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute ${
                    index === 0
                      ? 'bg-gradient-to-br from-primary-500 to-primary-600'
                      : 'bg-gradient-to-br from-primary-400 to-primary-500'
                  } rounded-sm`}
                  style={{
                    width: CELL_SIZE - 2,
                    height: CELL_SIZE - 2,
                    left: segment.x * CELL_SIZE + 1,
                    top: segment.y * CELL_SIZE + 1,
                  }}
                />
              ))}

              {/* Food */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="absolute bg-gradient-to-br from-accent-500 to-accent-600 rounded-full"
                style={{
                  width: CELL_SIZE - 2,
                  height: CELL_SIZE - 2,
                  left: food.x * CELL_SIZE + 1,
                  top: food.y * CELL_SIZE + 1,
                }}
              />

              {/* Game Over Overlay */}
              {isGameOver && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-black/70 flex items-center justify-center"
                >
                  <div className="text-center text-white">
                    <div className="text-3xl font-bold mb-4">{t('games.snake.gameOver')}</div>
                    <div className="text-xl mb-2">{t('games.snake.score')}: {score}</div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="text-center">
            {!isPlaying && !isGameOver && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetGame}
                className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
              >
                {t('games.snake.play')}
              </motion.button>
            )}
            {isGameOver && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetGame}
                className="px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
              >
                {t('games.snake.restart')}
              </motion.button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
