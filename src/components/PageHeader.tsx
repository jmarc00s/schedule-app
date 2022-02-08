import React, { ReactNode } from 'react';
import Button from './Button';
import ProgressBar from './ProgressBar';

interface PageHeaderProps {
  title: string;
  showProgress: boolean;
  btnText?: string;
  btnIcon?: ReactNode;
  disableBtn?: boolean;
  handleBtnClick: () => void;
}

const PageHeader = ({
  title,
  handleBtnClick,
  btnText,
  showProgress,
  disableBtn,
}: PageHeaderProps) => {
  return (
    <div>
      <div className="py-4 flex sm:flex-row flex-col items-center justify-between border-b border-gray-400">
        <h1 className="font-bold text-3xl">{title}</h1>
        {btnText && (
          <Button
            disabled={disableBtn}
            label={btnText}
            color="Indigo"
            handleClick={handleBtnClick}
          />
        )}
      </div>
      {showProgress && <ProgressBar />}
    </div>
  );
};

export default PageHeader;
