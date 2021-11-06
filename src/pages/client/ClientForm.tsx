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

  const { request, data, loading } = useAxios<ClientModel>();

  React.useEffect(() => {
    async function getClient(id: number) {
      const requestConfig: AxiosRequestConfig = {
        url: `/clients/${id}`,
        method: 'GET',
      };

      await request(requestConfig);
    }

    if (params.id) {
      getClient(Number(params.id));
    }

    if (data) {
      setClient(data);
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
    </section>
  );
};

export default ClientForm;
