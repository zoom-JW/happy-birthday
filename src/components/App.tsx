import React, { useState } from 'react';
import { WelcomePage } from '../pages/WelcomePage/Welcome.tsx';
import { MenuPage } from '../pages/MenuPage/MenuPage.tsx';
import { GameSchoolPage } from '../pages/GameSchoolPage/GameSchoolPage.tsx';
import { QuizPage } from '../pages/QuizPage/QuizPage.tsx';
import { FirstReward } from '../pages/FinalPage/FirstReward.tsx';
import { SecondReaward } from '../pages/FinalPage/SecondReaward.tsx';
import { playBGM, stopBGM } from '../utils/audioManager.ts';

type Page = 'welcome' | 'menu' | 'gameSchool' | 'firstReward' | 'quiz' | 'secondReward';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('welcome');

  const handleStartQuest = () => setCurrentPage('menu');
  const handleBackToWelcome = () => setCurrentPage('welcome');

  const handleSelectLevel = (level: number) => {
    if (level === 1) {
      stopBGM();
      playBGM('/sounds/fonMusic/gameschoolFirst.mp3', 0.5);
      setCurrentPage('gameSchool');
    } else if (level === 2) {
      stopBGM();
      playBGM('/sounds/fonMusic/fonfirstquiz.mp3', 0.5);
      setCurrentPage('quiz');
    }
  };

  const handleBackToMenu = () => {
    stopBGM();
    playBGM('/sounds/menu-music.mp3', 0.4);
    setCurrentPage('menu');
  };

  return (
    <div className="app-container">
      {currentPage === 'welcome' && (
        <WelcomePage onStart={handleStartQuest} />
      )}

      {currentPage === 'menu' && (
        <MenuPage
          onSelectLevel={handleSelectLevel}
          onBack={handleBackToWelcome}
        />
      )}

      {/* Игра 1 */}
      {currentPage === 'gameSchool' && (
        <GameSchoolPage
          onBack={handleBackToMenu}
          onComplete={() => setCurrentPage('firstReward')}
        />
      )}

      {/* Награда за Игру 1 */}
      {currentPage === 'firstReward' && (
        <FirstReward
          onNextLevel={() => handleSelectLevel(2)}
          onBackToMenu={handleBackToMenu}
        />
      )}

      {/* Игра 2 */}
      {currentPage === 'quiz' && (
        <QuizPage
          onBack={handleBackToMenu}
          onComplete={() => setCurrentPage('secondReward')}
        />
      )}

      {/* Финальная награда за Игру 2 */}
      {currentPage === 'secondReward' && (
        <SecondReaward
          onBackToMenu={handleBackToMenu}
        />
      )}
    </div>
  );
};

export default App;