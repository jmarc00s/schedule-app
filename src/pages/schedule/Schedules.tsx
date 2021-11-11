import React from 'react';
import PageHeader from '../../components/PageHeader';

const Schedules = () => {
  function handleAddScheduleClick() {
    console.log('clicou');
  }

  return (
    <section>
      <PageHeader
        title="Horários"
        showProgress={false}
        btnText="Adicionar horário"
        handleBtnClick={handleAddScheduleClick}
      />
    </section>
  );
};

export default Schedules;
