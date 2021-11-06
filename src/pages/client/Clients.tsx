import { AxiosRequestConfig } from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import ProgressBar from '../../components/ProgressBar';
import { useAxios } from '../../hooks/useAxios';

import { ClientModel } from '../../models/client.model';
import ClientTable from './components/ClientTable';

const Clients = () => {
  const [clients, setClients] = React.useState<ClientModel[]>([]);
  const { data, loading, request } = useAxios<ClientModel[]>();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function getClients() {
      const requestConfig: AxiosRequestConfig = {
        url: '/clients',
        method: 'GET',
      };

      await request(requestConfig);
    }

    if (!data) {
      getClients();
    } else {
      setClients(data);
    }
  }, [data, request]);

  return (
    <section>
      <PageHeader
        title="Clientes"
        btnText="Adicionar"
        handleBtnClick={() => navigate('/clients/add')}
        showProgress={loading}
      />
      <div className="mt-5">
        <ClientTable clients={clients} />
      </div>
    </section>
  );
};

export default Clients;
