import classNames from 'classnames';
import React from 'react';

interface DashboardCardProps {
  title: string;
  value: number;
  variant: 'green' | 'red' | 'orange' | 'blue';
}

const DashboardCard = ({ title, value, variant }: DashboardCardProps) => {
  const textClass = {
    'text-green-700': variant === 'green',
    'text-red-500': variant === 'red',
    'text-yellow-600': variant === 'orange',
    'text-blue-500': variant === 'blue',
  };

  return (
    <div
      className={classNames(
        `p-8 shadow bg-gray-50 rounded-lg flex flex-col justify-center w-64`
      )}
    >
      <span className={classNames(`text-6xl font-bold text-center mb-2`, textClass)}>
        {value}
      </span>
      <span className={classNames(`text-lg text-center`, textClass)}>{title}</span>
    </div>
  );
};

export default DashboardCard;
