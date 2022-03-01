import React, { useState } from 'react';
import Button from '../Button';

interface DatatablePaginationProps {
  pages: number;
  onPagination: (page: number) => void;
}

const DatatablePagination = ({ pages, onPagination }: DatatablePaginationProps) => {
  const [page, setPage] = useState(1);

  function handleNextPageClick() {
    setPage((page) => page + 1);
    onPagination(page + 1);
  }

  function handlePreviousPageClick() {
    if (page > 0) {
      setPage((page) => page - 1);
      onPagination(page - 1);
    }
  }

  return (
    <div className="w-full bg-gray-100 sticky bottom-0">
      <div className="flex flex-1 justify-between items-center p-2">
        <span className="ml-4">Página {page}</span>
        <div className="flex gap-2">
          <Button
            color="Dark indigo"
            handleClick={handlePreviousPageClick}
            label="Anterior"
            disabled={page === 1}
          />
          <Button color="Dark indigo" handleClick={handleNextPageClick} label="Próxima" />
        </div>
      </div>
    </div>
  );
};

export default DatatablePagination;
