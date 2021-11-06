import classNames from 'classnames';
import React from 'react';

type btnColor = 'Green' | 'Red' | 'Indigo';

interface ButtonProps {
  label: string;
  color: btnColor;
  handleClick: () => void;
  disabled?: boolean;
}

const Button = ({ label, handleClick, color, disabled }: ButtonProps) => {
  const colorClasses = {
    'bg-indigo-600': color === 'Indigo',
    'bg-green-600': color === 'Green',
    'bg-red-600': color === 'Red',
  };

  const disabledClasses = [
    'bg-gray-400',
    'text-black',
    'cursor-not-allowed',
    'opacity-50',
  ];

  return (
    <button
      disabled={disabled}
      className={classNames(
        'p-2 px-4 rounded',
        disabled ? disabledClasses : [`text-white`, colorClasses]
      )}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default Button;
