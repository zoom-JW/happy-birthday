import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';
import { playSFX } from '../../utils/audioManager';

// Импортируем компоненты всплывающих окон
import { GrandFatherFail } from './GrandFatherFail';
import { SoupFail } from './SoupFail';
import { SquareFail } from './SquareFail';

import styles from './QuizPage.module.scss';

interface QuizPageProps {
  onBack: () => void;
  onComplete: () => void;
}

interface Question {
  id: number;
  text: React.ReactNode; // Поддержка JSX для красивого оформления √2
  options: string[];
  correctAnswer: string;
}

// Типы активных модальных окон
type ActiveModal =
  | 'grandfather'
  | 'soup_correct'
  | 'soup_wrong'
  | 'square_correct'
  | 'square_honest'
  | null;

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'Сложи возраст мамы и папы, а затем вычти из него свой возраст. Какое число получилось?',
    options: ['65', '75', '82', '100'],
    correctAnswer: '75',
  },
  {
    id: 2,
    text: 'Сколько всего родных братьев и сестер у твоих родителей ?',
    options: ['0', '2', '4', '1'],
    correctAnswer: '2',
  },
  {
    id: 3,
    text: 'Какой самый изысканный суп в твоей жизни ты когда-либо ел?',
    options: ['Суп дяди Андрея', 'Домашняя солянка', 'Суп с фрикадельками', 'Грибной крем-суп'],
    correctAnswer: 'Суп дяди Андрея',
  },
  {
    id: 4,
    text: (
      <>
        Чему равен математический корень из двух (
        <span style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#ff4757' }}>√2</span>) ?
      </>
    ),
    options: ['1,414214', '1,412356', '1,415926', 'Не знаю'],
    correctAnswer: '1,414214',
  },
  {
    id: 5,
    text: 'Сколько у тебя дедушек и как их зовут?',
    options: ['Два: Серёжа и Володя', 'Два: Серёжа и Миша', 'Два: Серёжа и Игорь', 'Один: Саша'],
    correctAnswer: 'Два: Серёжа и Володя',
  },
  {
    id: 6,
    text: 'На какой планете ты жил до своего рождения (по рассказам бабушки)?',
    options: ['На планете красных обезьян', 'На планете маленьких Артёмов', 'На планете марсиан', 'На планете сладкоежек'],
    correctAnswer: 'На планете красных обезьян',
  },
  {
    id: 7,
    text: 'Какая собака в детстве на тебя громче всех гавкала?',
    options: ['Доменика', 'Шарик', 'Жучка', 'Барон'],
    correctAnswer: 'Доменика',
  },
  {
    id: 8,
    text: 'Кто дольше всех сидит в туалете?',
    options: ['Артём', 'Родион', 'Мама', 'Папа'],
    correctAnswer: 'Артём',
  },
];

const shuffleArray = <T,>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const QuizPage: React.FC<QuizPageProps> = ({ onBack, onComplete }) => {
  const [questions] = useState<Question[]>(() => {
    const shuffledQuestions = shuffleArray(QUESTIONS);
    return shuffledQuestions.map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
  });
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  const currentQuestion = questions[currentIndex];
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  // Переход к следующему вопросу
  const advanceToNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      onComplete();
    }
  };

  // Закрытие модального окна
  const handleCloseModal = () => {
    if (activeModal === 'grandfather') {
      setActiveModal(null);
      onBack(); // При ошибке в вопросе с дедушками выкидываем в меню!
    } else {
      setActiveModal(null);
      advanceToNextQuestion();
    }
  };

  // Обработка выбора ответа
  const handleSelectOption = (option: string) => {
    if (isAnswered) return;

    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option === currentQuestion.correctAnswer;

    if (isCorrect) {
      playSFX('/sounds/gameSchool/catchGood.mp3');
    } else {
      playSFX('/sounds/gameSchool/catchBad.mp3');
    }

    // Проверяем, нужно ли показать специальное всплывающее окно
    let modalToTrigger: ActiveModal = null;

    if (currentQuestion.id === 3) {
      // Вопрос про суп (показывается всегда)
      modalToTrigger = isCorrect ? 'soup_correct' : 'soup_wrong';
    } else if (currentQuestion.id === 4) {
      // Вопрос про корень из 2 (√2)
      if (option === '1,414214') {
        modalToTrigger = 'square_correct';
      } else if (option === 'Не знаю') {
        modalToTrigger = 'square_honest';
      } else {
        modalToTrigger = null;
      }
    } else if (currentQuestion.id === 5 && !isCorrect) {
      // Вопрос про дедушек (показывается только при ошибке)
      modalToTrigger = 'grandfather';
    }

    if (modalToTrigger) {
      // Если окно сработало — показываем его (переход к след. вопросу произойдет после закрытия окна)
      setActiveModal(modalToTrigger);
    } else {
      // Стандартная задержка 1.2 сек перед следующим вопросом
      setTimeout(() => {
        advanceToNextQuestion();
      }, 1200);
    }
  };

  return (
    <div className={styles.container}>
      {/* Верхняя панель */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          <ArrowLeft size={20} />
          <span>В меню</span>
        </button>

        <div className={styles.progressCounter}>
          Вопрос {currentIndex + 1} из {questions.length}
        </div>
      </div>

      {/* Шкала прогресса */}
      <div className={styles.progressBarBg}>
        <motion.div
          className={styles.progressBarFill}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Карточка вопроса */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          className={styles.card}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.iconBadge}>
            <HelpCircle size={40} color="#ff4757" />
          </div>

          <h2 className={styles.questionText}>{currentQuestion.text}</h2>

          <div className={styles.optionsList}>
            {currentQuestion.options.map((option, idx) => {
              let btnStyle = styles.optionBtn;

              if (isAnswered) {
                if (option === currentQuestion.correctAnswer) {
                  btnStyle = `${styles.optionBtn} ${styles.correct}`;
                } else if (option === selectedOption) {
                  btnStyle = `${styles.optionBtn} ${styles.wrong}`;
                }
              }

              return (
                <button
                  key={idx}
                  className={btnStyle}
                  onClick={() => handleSelectOption(option)}
                  disabled={isAnswered}
                >
                  <span>{option}</span>
                  {isAnswered && option === currentQuestion.correctAnswer && (
                    <CheckCircle2 size={22} className={styles.icon} />
                  )}
                  {isAnswered && option === selectedOption && option !== currentQuestion.correctAnswer && (
                    <XCircle size={22} className={styles.icon} />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Всплывающие модальные окна */}
      <AnimatePresence>
        {activeModal === 'grandfather' && (
          <GrandFatherFail onClose={handleCloseModal} />
        )}

        {(activeModal === 'soup_correct' || activeModal === 'soup_wrong') && (
          <SoupFail
            isCorrect={activeModal === 'soup_correct'}
            onClose={handleCloseModal}
          />
        )}

        {(activeModal === 'square_correct' || activeModal === 'square_honest') && (
          <SquareFail
            isCorrect={activeModal === 'square_correct'}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </div>
  );
};