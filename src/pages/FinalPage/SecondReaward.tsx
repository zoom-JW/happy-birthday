import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { playSFX } from '../../utils/audioManager';
import styles from './FinalPage.module.scss';

interface SecondReawardProps {
  onBackToMenu?: () => void;
}

export const SecondReaward: React.FC<SecondReawardProps> = ({ onBackToMenu }) => {
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
          <span className={styles.hamsterEmoji}>🐹</span>
        </div>

        <h1 className={styles.title}>Квест полностью пройден! 🎉</h1>

        <p className={styles.description}>
          Ты прошёл все секретные испытания! Вот твои главные подарки:
        </p>

        <div className={styles.rewardsList}>
          <div className={styles.rewardItem}>
            <Sparkles color="#f1c40f" size={24} />
            <span className={styles.rewardValue}>Хомяк 🐹</span>
            <Sparkles color="#f1c40f" size={24} />
          </div>
          <div className={styles.rewardItem}>
            <span className={styles.rewardValue}>$50 💵</span>
          </div>
        </div>

        {onBackToMenu && (
          <button className={styles.primaryButton} onClick={handleMenuClick}>
            В главное меню
          </button>
        )}
      </motion.div>
    </div>
  );
};