import React, { ReactNode } from 'react';
import Button from './Button';
import ProgressBar from './ProgressBar';

interface PageHeaderProps {
  title: string;
  showProgress?: boolean;
  btnText?: string;
  btnIcon?: ReactNode;
  disableBtn?: boolean;
  handleBtnClick?: () => void;
}

const PageHeader = ({
  title,
  handleBtnClick,
  btnText,
  showProgress = false,
  disableBtn,
}: PageHeaderProps) => {
  return (
    <div className="pb-4">
      <div className="pb-4 flex sm:flex-row flex-col justify-between">
        <h1 className="font-bold text-3xl text-gray-700">{title}</h1>
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
