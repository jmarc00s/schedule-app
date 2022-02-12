import { AxiosRequestConfig } from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useConfirmation from 'src/core/hooks/useConfirmation';
import { IconPlus } from '../../components/icons/IconPlus';
import PageHeader from '../../components/PageHeader';
import Layout from '../../components/template/Layout';
import { useAxios } from '../../core/hooks/useAxios';

import { ClientModel } from '../../core/models/client.model';
import ClientTable from './components/ClientTable';

const Clients = () => {
  const [clients, setClients] = React.useState<ClientModel[]>([]);
  const { loading, request, error } = useAxios<ClientModel[]>();
  const navigate = useNavigate();
  const { openDialog } = useConfirmation();

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
    const confirm = openDialog('Deseja realmente excluir esse registro?');

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
      <ClientTable clients={clients} handleRemoveClick={handleRemove} />
    </Layout>
  );
};

export default Clients;
