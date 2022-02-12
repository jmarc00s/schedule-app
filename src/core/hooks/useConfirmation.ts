import React from 'react';

const useConfirmation = () => {
  function openDialog(message: string): boolean {
    const confirmation = window.confirm(message);
    return confirmation;
  }

  return {
    openDialog,
  };
};

export default useConfirmation;
