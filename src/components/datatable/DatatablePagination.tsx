import React, { useMemo, useState } from 'react';
import Button from '../Button';

interface DatatablePaginationProps {
  total: number;
  onPagination: (page: number) => void;
}

const DatatablePagination = ({ total, onPagination }: DatatablePaginationProps) => {
  const [page, setPage] = useState(1);

  const totalPages = useMemo(() => Math.ceil(total / 10), [total]);

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
    <div className="sticky bottom-0 w-full bg-white shadow">
      <div className="flex items-center justify-between flex-1 p-2">
        <span className="ml-4">
          Página {page} de {totalPages}
        </span>
        <div className="flex gap-2">
          <Button
            color="Dark indigo"
            handleClick={handlePreviousPageClick}
            label="Anterior"
            disabled={page === 1}
          />
          <Button
            color="Dark indigo"
            handleClick={handleNextPageClick}
            label="Próxima"
            disabled={page === totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default DatatablePagination;
