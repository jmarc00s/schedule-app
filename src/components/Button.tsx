import classNames from 'classnames';
import React from 'react';

type btnColor = 'Green' | 'Red' | 'Indigo';

interface ButtonProps {
  label: string;
  color: btnColor;
  handleClick: () => void;
}

const Button = ({ label, handleClick, color }: ButtonProps) => {
  const colorClasses = {
    'bg-indigo-600': color === 'Indigo',
    'bg-green-600': color === 'Green',
    'bg-red-600': color === 'Red',
  };

  return (
    <button
      className={classNames(`text-white p-2 px-4 rounded`, colorClasses)}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default Button;
