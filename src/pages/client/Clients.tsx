import { AxiosRequestConfig } from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconPlus } from '../../components/icons/IconPlus';
import PageHeader from '../../components/PageHeader';
import Layout from '../../components/template/Layout';
import { useAxios } from '../../hooks/useAxios';

import { ClientModel } from '../../models/client.model';
import ClientTable from './components/ClientTable';

const Clients = () => {
  const [clients, setClients] = React.useState<ClientModel[]>([]);
  const { loading, request, error } = useAxios<ClientModel[]>();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function getClients() {
      const requestConfig: AxiosRequestConfig = {
        url: '/clients',
        method: 'GET',
      };

      const clients = await request(requestConfig);

      if (clients) {
        setClients(clients);
      }
    }

    getClients();
  }, []);

  async function handleRemove(id: number) {
    const confirm = window.confirm('Deseja realmente excluir esse registro?');

    if (confirm) {
      var requestConfig: AxiosRequestConfig = {
        url: `/clients/${id}`,
        method: 'DELETE',
      };

      await request(requestConfig);

      if (!error) {
        setClients(clients.filter((client) => client.id !== id));
      }
    }
  }

  return (
    <Layout>
      <PageHeader
        title="Clientes"
        btnText="Adicionar cliente"
        handleBtnClick={() => navigate('/clients/add')}
        showProgress={loading}
      />
      <div className="mt-5">
        <ClientTable clients={clients} handleRemoveClick={handleRemove} />
      </div>
    </Layout>
  );
};

export default Clients;
