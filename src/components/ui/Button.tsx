import React from 'react';
import { playSFX } from '../../utils/audioManager';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  soundSrc?: string; // Возможность переопределить звук клика, если нужно
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  soundSrc = '/sounds/click.mp3',
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 1. Воспроизводим звук
    playSFX(soundSrc);

    // 2. Вызываем переданный обработчик клика (если он есть)
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
};