import { ReactNode } from 'react';

interface IconBadgeProps {
  icon: ReactNode;
  value: number;
  onClick?: () => void;
}

const IconBadge = ({ icon, value, onClick }: IconBadgeProps) => {
  return (
    <div
      className="relative flex items-center justify-center w-8 h-8 rounded-full cursor-pointer hover:bg-indigo-700"
      onClick={onClick}
    >
      {icon}
      <span
        style={{
          top: -10,
          right: -10,
        }}
        className={`absolute inline-flex items-center justify-center px-2 py-1 text-xs font-bold bg-red-600 rounded-full text-red-100`}
      >
        {value}
      </span>
    </div>
  );
};

export default IconBadge;
