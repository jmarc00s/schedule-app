import React from 'react';
import ProgressBar from './ProgressBar';

interface PageHeaderProps {
  title: string;
  btnText: string;
  showProgress: boolean;
  handleBtnClick?: () => void;
}

const PageHeader = ({
  title,
  handleBtnClick,
  btnText,
  showProgress,
}: PageHeaderProps) => {
  return (
    <div>
      <div className="py-4 flex sm:flex-row flex-col items-center justify-between border-b border-gray-400">
        <h1 className="font-bold text-3xl">{title}</h1>
        <button
          onClick={handleBtnClick}
          className="bg-indigo-600 text-white p-2 rounded w-24"
        >
          {btnText}
        </button>
      </div>
      {showProgress && <ProgressBar />}
    </div>
  );
};

export default PageHeader;
