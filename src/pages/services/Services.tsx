import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';

const Services = () => {
  const navigate = useNavigate();

  function handleAddServiceClick() {
    navigate('/services/add');
  }

  return (
    <section>
      <PageHeader
        title="Serviços"
        btnText="Adicionar serviço"
        showProgress={false}
        handleBtnClick={handleAddServiceClick}
      />
    </section>
  );
};

export default Services;
