import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ScheduleForm from 'src/components/ScheduleForm';
import PageHeader from '../../components/PageHeader';

const ScheduleFormPage = () => {
  const navigate = useNavigate();
  const [submit, setSubmit] = useState(false);

  function handleAfterSubmit(success: boolean) {
    setSubmit(false);
    if (success) {
      navigate('/schedules');
    }
  }

  return (
    <section>
      <PageHeader
        title="Adicionar horário"
        showProgress={false}
        btnText="Salvar"
        handleBtnClick={() => setSubmit(true)}
      />
      <ScheduleForm
        afterSubmit={handleAfterSubmit}
        submit={submit}
        setSubmit={setSubmit}
      />
    </section>
  );
};

export default ScheduleFormPage;
