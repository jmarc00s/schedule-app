import React, { useState } from 'react';
import Button from '../Button';

interface DatatablePaginationProps {
  pages: number;
  onNextPage: (page: number) => void;
  onPreviousPage: (page: number) => void;
}

const DatatablePagination = ({
  pages,
  onNextPage,
  onPreviousPage,
}: DatatablePaginationProps) => {
  const [page, setPage] = useState(1);

  //   const pagesArray = useMemo(() => {
  //     return Array.from(Array(pages).keys());
  //   }, [pages]);

  function handleNextPageClick() {
    setPage((page) => page + 1);
    onNextPage(page);
  }

  function handlePreviousPageClick() {
    if (page > 0) {
      setPage((page) => page - 1);
      onPreviousPage(page);
    }
  }

  return (
    <div className="w-full bg-gray-100 sticky bottom-0">
      <div className="flex flex-1 justify-end items-center gap-2 p-2">
        {/* {pagesArray.map((page) => (
          <span>{page}</span>
        ))} */}
        <Button
          color="Dark indigo"
          handleClick={handlePreviousPageClick}
          label="Anterior"
          disabled={page === 1}
        />
        <Button color="Dark indigo" handleClick={handleNextPageClick} label="Próxima" />
      </div>
    </div>
  );
};

export default DatatablePagination;
