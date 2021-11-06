import React from 'react';

interface PageHeaderProps {
  title: string;
  btnText: string;
  handleBtnClick?: () => void;
}

const PageHeader = ({ title, handleBtnClick, btnText }: PageHeaderProps) => {
  return (
    <div className="py-4 flex sm:flex-row flex-col items-center justify-between border-b border-gray-400">
      <h1 className="font-bold text-3xl">{title}</h1>
      <button
        onClick={handleBtnClick}
        className="bg-indigo-600 text-white p-2 rounded w-24"
      >
        {btnText}
      </button>
    </div>
  );
};

export default PageHeader;
