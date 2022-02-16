import classNames from 'classnames';
import React, { ReactNode } from 'react';

type btnColor = 'Green' | 'Red' | 'Indigo' | 'Dark indigo';

interface ButtonProps {
  label?: string;
  icon?: ReactNode;
  color: btnColor;
  handleClick?: () => void;
  disabled?: boolean;
  type?: any;
}

const Button = ({ label, handleClick, color, disabled, icon, type }: ButtonProps) => {
  const colorClasses = {
    'bg-indigo-400': color === 'Indigo',
    'bg-green-300': color === 'Green',
    'bg-red-300': color === 'Red',
    'bg-indigo-800': color === 'Dark indigo',
  };

  const textClasses = {
    'text-indigo-800': color === 'Indigo',
    'text-green-800': color === 'Green',
    'text-red-800': color === 'Red',
    'text-gray-50': color === 'Dark indigo',
  };

  const disabledClasses = [
    'bg-gray-400',
    'text-black',
    'cursor-not-allowed',
    'opacity-50',
  ];

  return (
    <button
      type={type}
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
