import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { playSFX } from '../../utils/audioManager';
import styles from './MenuPage.module.scss';

interface MenuPageProps {
  onSelectLevel: (level: number) => void;
  onBack: () => void; // Добавили проп для возврата назад
}

export const MenuPage: React.FC<MenuPageProps> = ({ onSelectLevel, onBack }) => {
  const levels = [1, 2];

  const handleLevelClick = (level: number) => {
    playSFX('/sounds/click.mp3');
    onSelectLevel(level);
  };

  const handleBackClick = () => {
    playSFX('/sounds/click.mp3');
    onBack();
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <h1 className={styles.title}>Выберите уровень</h1>

        <div className={styles.levelsList}>
          {levels.map((level) => (
            <motion.button
              key={level}
              className={styles.levelBtn}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleLevelClick(level)}
            >
              {level === 1 ? 'Первое испытание' : 'Второе испытание'}
            </motion.button>
          ))}
        </div>

        <button className={styles.backButton} onClick={handleBackClick}>
          <ArrowLeft size={20} />
          <span>Назад</span>
        </button>
      </motion.div>
    </div>
  );
};