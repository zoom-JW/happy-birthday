import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, PartyPopper } from 'lucide-react';
import styles from './WelcomePage.module.scss';
import { playSFX, playBGM } from '../../utils/audioManager';

interface WelcomePageProps {
  onStart: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onStart }) => {
  useEffect(() => {
    // Включаем фоновую музыку меню при загрузке страницы Welcome
    playBGM('/sounds/menu-music.mp3', 0.2);
  }, []);

  const handleStartClick = () => {
    // 1. Звук клика по кнопке
    playSFX('/sounds/click.mp3');

    // 2. Вызов функции перехода на следующую страницу (onStart)
    onStart();
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.card}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className={styles.iconBadge}>
          <PartyPopper size={48} color="#ff4757" />
        </div>

        <h1 className={styles.title}>
          С Днём Рождения! <span className={styles.highlight}>10 лет!</span>
        </h1>

        <p className={styles.description}>
          Привет! Сегодня тебе исполняется 10 лет — это твой первый двойной юбилей!
          В честь этого события тебя ждёт крутой подарок. Но чтобы его получить,
          нужно пройти <strong>2 секретных испытания</strong>.
        </p>

        <div className={styles.infoBox}>
          <Sparkles className={styles.sparkleIcon} size={20} />
          <span>Проверь свою ловкость, порядок и знания!</span>
        </div>

        <button className={styles.startButton} onClick={handleStartClick}>
          Начать квест
        </button>
      </motion.div>
    </div>
  );
};