import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './QuizPage.module.scss';

interface GrandFatherFailProps {
  onClose: () => void;
}

export const GrandFatherFail: React.FC<GrandFatherFailProps> = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 15000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={styles.modalCard}
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
      >
        <h2>Эй, именинник! 👴👴</h2>
        <p>
          Как это ты не знаешь, сколько у тебя дедушек и как их зовут?! Ну-ка марш вспоминать, а то дедушки обидятся! 😉
        </p>
        <button className={styles.modalButton} onClick={onClose}>
          Ой, сейчас вспомню! 😄
        </button>
      </motion.div>
    </motion.div>
  );
};