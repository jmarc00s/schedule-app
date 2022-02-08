import classNames from 'classnames';
import React, { ReactNode } from 'react';

type btnColor = 'Green' | 'Red' | 'Indigo';

interface ButtonProps {
  label?: string;
  icon?: ReactNode;
  color: btnColor;
  handleClick: () => void;
  disabled?: boolean;
}

const Button = ({ label, handleClick, color, disabled, icon }: ButtonProps) => {
  const colorClasses = {
    'bg-indigo-400': color === 'Indigo',
    'bg-green-300': color === 'Green',
    'bg-red-300': color === 'Red',
  };

  const textClasses = {
    'text-indigo-800': color === 'Indigo',
    'text-green-800': color === 'Green',
    'text-red-800': color === 'Red',
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
        'py-2 px-6 rounded font-semibold',
        disabled ? disabledClasses : [`text-white`, colorClasses, textClasses]
      )}
      onClick={handleClick}
    >
      {label || icon}
    </button>
  );
};

export default Button;
