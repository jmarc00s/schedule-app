import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

const Card = ({ title, subtitle, children }: CardProps) => {
  return (
    <div className="w-full rounded shadow-md p-5">
      <h2 className="text-xl text-gray-800 font-semibold">{title}</h2>
      {subtitle ?? <p className="text-gray-500">{subtitle}</p>}
      {children ?? <div className="mt-3">{children}</div>}
    </div>
  );
};

export default Card;
