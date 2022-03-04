import React, { ReactNode } from 'react';

interface FabButtonProps {
  icon: ReactNode;
  onClick: () => void;
}

const FabButton = ({ icon, onClick }: FabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`h-12 w-12 rounded-full bg-indigo-600 text-white 
      absolute bottom-5 right-5 flex items-center justify-center shadow
      hover:bg-indigo-800 transition-all duration-300 
      `}
    >
      {icon}
    </button>
  );
};

export default FabButton;
