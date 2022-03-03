import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

const Card = ({ title, subtitle, children }: CardProps) => {
  return (
    <div className="w-full rounded shadow-md p-5 bg-gray-50">
      <h2 className="text-xl text-gray-700 font-bold mb-4">{title}</h2>
      {subtitle ?? <p className="text-gray-400">{subtitle}</p>}
      {children}
    </div>
  );
};

export default Card;
