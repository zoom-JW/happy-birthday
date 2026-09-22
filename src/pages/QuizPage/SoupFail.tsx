import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './QuizPage.module.scss';

interface SoupFailProps {
  isCorrect: boolean;
  onClose: () => void;
}

export const SoupFail: React.FC<SoupFailProps> = ({ isCorrect, onClose }) => {
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
        {isCorrect ? (
          <>
            <h2>Фууу! 🥣🪱</h2>
            <p>И правильно! Ты же отлично помнишь, какой на вкус этот суп!</p>
          </>
        ) : (
          <>
            <h2>Как так-то?! 😱</h2>
            <p>Как ты мог забыть блестящий суп Андрея с опарышами?! Такое шедевральное блюдо не забывается!</p>
          </>
        )}
        <button className={styles.modalButton} onClick={onClose}>
          Понятно 😄
        </button>
      </motion.div>
    </motion.div>
  );
};