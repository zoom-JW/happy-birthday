import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './QuizPage.module.scss';

interface SquareFailProps {
  isCorrect: boolean; // true если ответил правильное число (~1.41), false если ответил "Не знаю"
  onClose: () => void;
}

export const SquareFail: React.FC<SquareFailProps> = ({ isCorrect, onClose }) => {
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
            <h2>Так-так-так! 🧐📱</h2>
            <p>Нельзя подсматривать или подсказывать тебе, это неспортивно!</p>
          </>
        ) : (
          <>
            <h2>Уважаем! 🤝✨</h2>
            <p>Молодец, ты очень ответственный и честный мальчик!</p>
          </>
        )}
        <button className={styles.modalButton} onClick={onClose}>
          Идем дальше 🚀
        </button>
      </motion.div>
    </motion.div>
  );
};