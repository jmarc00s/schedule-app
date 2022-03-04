import { useState } from 'react';
import AddScheduleDialog from 'src/components/AddScheduleDialog';
import PageHeader from '../../components/PageHeader';
import SchedulesTable from './components/SchedulesTable';
import { SchedulesProvider } from '../../core/context/SchedulesContext';
import useSchedules from '../../core/hooks/useSchedules';

const Schedules = () => {
  const [openModal, setOpenModal] = useState(false);
  const { loading, fetchSchedules } = useSchedules();

  function handleAddScheduleClick() {
    setOpenModal(true);
  }

  function handleScheduleDialogClose() {
    fetchSchedules();
  }

  return (
    <SchedulesProvider>
      <>
        <PageHeader
          title="Horários"
          showProgress={loading}
          btnText="Adicionar horário"
          handleBtnClick={handleAddScheduleClick}
        />
        <div style={{ height: '60vh', overflow: 'auto' }}>
          <SchedulesTable />
        </div>
        <AddScheduleDialog
          open={openModal}
          setOpen={setOpenModal}
          onClose={handleScheduleDialogClose}
        />
      </>
    </SchedulesProvider>
  );
};

export default Schedules;
