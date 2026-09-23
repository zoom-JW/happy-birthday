import React from 'react';
import { motion } from 'framer-motion';
import styles from './GameSchoolPage.module.scss';

interface InstructionModalProps {
  onStart: () => void;
}

export const InstructionModal: React.FC<InstructionModalProps> = ({ onStart }) => {
  return (
    <div className={styles.overlay}>
      <motion.div
        className={styles.card}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className={styles.title}>🎒 Первое испытание: Школьный ловкач!</h2>
        <p className={styles.subtitle}>Проверь свою реакцию перед началом уроков!</p>

        <div className={styles.rulesContainer}>
          <div className={styles.ruleCard}>
            <h3>🎯 Цель игры</h3>
            <p>Набрать <b>20 очков</b> за <b>30 секунд</b></p>
          </div>

          <div className={`${styles.ruleCard} ${styles.good}`}>
            <h3>✅ Лови (+1 очко)</h3>
            <div className={styles.emojiList}>📚 ✏️ 📏 🎒 🎨 📐</div>
          </div>

          <div className={`${styles.ruleCard} ${styles.bad}`}>
            <h3>❌ Избегай (-1 очко)</h3>
            <div className={styles.emojiList}>🎮 🍕 📱 🕷️ 💣</div>
          </div>
        </div>

        <button className={styles.startButton} onClick={onStart}>
          Погнали! 🚀
        </button>
      </motion.div>
    </div>
  );
};