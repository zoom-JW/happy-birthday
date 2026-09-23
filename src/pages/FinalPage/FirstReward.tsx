import React from 'react';
import { motion } from 'framer-motion';
import { Banknote, ArrowRight } from 'lucide-react';
import { playSFX } from '../../utils/audioManager';
import styles from './FinalPage.module.scss';

interface FirstRewardProps {
  onNextLevel?: () => void;
  onBackToMenu?: () => void;
}

export const FirstReward: React.FC<FirstRewardProps> = ({ onNextLevel, onBackToMenu }) => {
  const handleNextClick = () => {
    playSFX('/sounds/click.mp3');
    if (onNextLevel) onNextLevel();
  };

  const handleMenuClick = () => {
    playSFX('/sounds/click.mp3');
    if (onBackToMenu) onBackToMenu();
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
          <Banknote size={56} color="#2ed573" />
        </div>

        <h1 className={styles.title}>Первое испытание пройдено!</h1>

        <p className={styles.description}>
          Ты отлично справился с первым заданием и заслужил свою первую награду:
        </p>

        <div className={styles.rewardBox}>
          <span className={styles.rewardValue}>$50 💵</span>
        </div>

        <div className={styles.buttonsGroup}>
          {onNextLevel && (
            <button className={styles.primaryButton} onClick={handleNextClick}>
              <span>Второе испытание</span>
              <ArrowRight size={20} />
            </button>
          )}

          {onBackToMenu && (
            <button className={styles.secondaryButton} onClick={handleMenuClick}>
              Вернуться в меню
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};