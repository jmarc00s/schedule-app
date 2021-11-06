import React from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';

const ClientForm = () => {
  const params = useParams();

  return (
    <section>
      <PageHeader
        title={params.id ? 'Editar cliente' : 'Adicionar cliente'}
        btnText="Salvar"
        handleBtnClick={() => console.log('Salvando cliente')}
      />
    </section>
  );
};

export default ClientForm;
