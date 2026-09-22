import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Timer, Trophy, ShoppingBasket } from 'lucide-react';
import { playSFX, playBGM, stopBGM, stopAllSFX } from '../../utils/audioManager';
import styles from './GameSchoolPage.module.scss';

interface GameSchoolPageProps {
  onBack: () => void;
  onComplete: () => void;
}

interface Item {
  id: number;
  emoji: string;
  isGood: boolean;
  x: number; // Позиция по X в % (5..95)
  y: number; // Позиция по Y в % (0..105)
  speed: number; // Скорость падения (% за кадр)
}

const GOOD_ITEMS = ['📚', '✏️', '📏', '🎒', '🎨', '📐'];
const BAD_ITEMS = ['🎮', '🍕', '🕷️', '💣', '📱'];
const TARGET_SCORE = 20; // Цель: словить 20 предметов

export const GameSchoolPage: React.FC<GameSchoolPageProps> = ({ onBack, onComplete }) => {
  const [score, setScore] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [items, setItems] = useState<Item[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [basketX, setBasketX] = useState<number>(50); // Положение корзины в % (0..100)

  const itemsRef = useRef<Item[]>([]);
  const scoreRef = useRef<number>(0);
  const basketXRef = useRef<number>(50);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  // Синхронизируем рефы с стейтом для плавных анимаций в requestAnimationFrame
  itemsRef.current = items;
  scoreRef.current = score;
  basketXRef.current = basketX;

  // 1. Таймер игры
  useEffect(() => {
    if (isGameOver) return;

    if (timeLeft <= 0) {
      if (score < TARGET_SCORE) {
        setIsGameOver(true);
        stopBGM();
        stopAllSFX();
        playSFX('/sounds/endPages/lose.mp3');
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;
        if (next > 0 && next <= 5) {
          playSFX('/sounds/taimer.mp3', 0.4);
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, score, isGameOver]);

  // 2. Спавн предметов сверху
  useEffect(() => {
    if (isGameOver || timeLeft <= 0) return;

    const spawnInterval = setInterval(() => {
      const isGood = Math.random() > 0.3; // 70% хороших, 30% плохих
      const pool = isGood ? GOOD_ITEMS : BAD_ITEMS;
      const emoji = pool[Math.floor(Math.random() * pool.length)];

      const newItem: Item = {
        id: Date.now() + Math.random(),
        emoji,
        isGood,
        x: Math.floor(Math.random() * 85) + 7,
        y: -10,
        speed: (Math.random() * 0.4 + 0.6) * 0.8,
      };

      setItems((prev) => [...prev, newItem]);
    }, 600);

    return () => clearInterval(spawnInterval);
  }, [isGameOver, timeLeft]);

  // 3. Анимация падения и проверка столкновений (Collision Detection)
  useEffect(() => {
    if (isGameOver || timeLeft <= 0) return;

    let animId: number;

    const updatePhysics = () => {
      const currentBasketX = basketXRef.current;
      const currentScore = scoreRef.current;
      const BASKET_WIDTH_RADIUS = 8;
      const BASKET_Y_TRIGGER = 85;

      const updatedItems: Item[] = [];

      for (const item of itemsRef.current) {
        const nextY = item.y + item.speed;

        if (nextY >= BASKET_Y_TRIGGER && nextY <= BASKET_Y_TRIGGER + 8) {
          const distanceX = Math.abs(item.x - currentBasketX);

          if (distanceX <= BASKET_WIDTH_RADIUS) {
            if (item.isGood) {
              playSFX('/sounds/gameSchool/catchGood.mp3');
              const newScore = currentScore + 1;
              setScore(newScore);

              if (newScore >= TARGET_SCORE) {
                onComplete();
                return;
              }
            } else {
              playSFX('/sounds/gameSchool/catchBad.mp3');
              setScore((prev) => Math.max(0, prev - 1));
            }
            continue;
          }
        }

        if (nextY <= 105) {
          updatedItems.push({ ...item, y: nextY });
        }
      }

      setItems(updatedItems);
      animId = requestAnimationFrame(updatePhysics);
    };

    animId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animId);
  }, [isGameOver, timeLeft, onComplete]);

  // 4. Отслеживание мыши для перемещения корзины
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const percentX = (relativeX / rect.width) * 100;

    const clampedX = Math.max(5, Math.min(95, percentX));
    setBasketX(clampedX);
  };

  return (
    <div className={styles.container}>
      {/* Шапка с кнопкой назад и статистикой */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          <ArrowLeft size={20} />
          <span>В меню</span>
        </button>

        <div className={styles.stats}>
          <div className={styles.statItem}>
            <Trophy size={20} color="#f1c40f" />
            <span>{score} / {TARGET_SCORE}</span>
          </div>
          <div className={`${styles.statItem} ${timeLeft <= 5 ? styles.dangerTimer : ''}`}>
            <Timer size={20} color="#e74c3c" />
            <span>{timeLeft} с</span>
          </div>
        </div>
      </div>

      {/* Игровое поле */}
      <div
        ref={gameAreaRef}
        className={styles.gameArea}
        onMouseMove={handleMouseMove}
      >
        {!isGameOver ? (
          <>
            {/* Падающие предметы */}
            {items.map((item) => (
              <div
                key={item.id}
                className={styles.gameItem}
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                }}
              >
                {item.emoji}
              </div>
            ))}

            {/* Корзина, следующая за мышкой */}
            <div
              className={styles.basket}
              style={{ left: `${basketX}%` }}
            >
              <ShoppingBasket size={48} color="#ff4757" />
            </div>
          </>
        ) : (
          <motion.div
            className={styles.gameOverCard}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2>Упс! Именинник ещё не проснулся? 😴</h2>
            <p>
              Похоже, твой супер-скилл только разминается! Включай реакцию на максимум и покажи этим предметам, кто тут главный! ⚡
            </p>
            <button
              className={styles.retryButton}
              onClick={() => {
                stopAllSFX();
                setScore(0);
                setTimeLeft(30);
                setIsGameOver(false);
                setItems([]);
                playSFX('/sounds/click.mp3');
                playBGM('/sounds/fonMusic/gameschoolFirst.mp3', 0.5);
              }}
            >
              Врубить турбо-режим! 🚀
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};