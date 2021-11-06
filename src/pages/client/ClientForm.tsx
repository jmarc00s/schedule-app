import { AxiosRequestConfig } from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { useAxios } from '../../hooks/useAxios';
import { ClientModel } from '../../models/client.model';

const ClientForm = () => {
  const params = useParams();
  const [client, setClient] = React.useState<ClientModel | undefined>(
    undefined
  );

  const { request, loading } = useAxios<ClientModel>();

  React.useEffect(() => {
    async function getClient(id: number) {
      const requestConfig: AxiosRequestConfig = {
        url: `/clients/${id}`,
        method: 'GET',
      };

      const data = await request(requestConfig);

      if (data) {
        setClient(data);
      }
    }

    if (params.id) {
      getClient(Number(params.id));
    }
  }, []);

  return (
    <section>
      <PageHeader
        title={params.id ? 'Editar cliente' : 'Adicionar cliente'}
        btnText="Salvar"
        handleBtnClick={() => console.log('Salvando cliente')}
        showProgress={loading}
      />
      <div>{client?.name}</div>
    </section>
  );
};

export default ClientForm;
