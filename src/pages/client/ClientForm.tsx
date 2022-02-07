import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAxios } from '../../hooks/useAxios';
import { AxiosRequestConfig } from 'axios';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';

import { ClientModel } from '../../models/client.model';
import Layout from '../../components/template/Layout';

const ClientForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [client, setClient] = React.useState<ClientModel | undefined>(undefined);
  const { request, loading } = useAxios<ClientModel>();

  const [name, setName] = React.useState<string>('');
  const [address, setAddress] = React.useState<string>('');

  React.useEffect(() => {
    async function getClient(id: number) {
      const requestConfig: AxiosRequestConfig = {
        url: `/clients/${id}`,
        method: 'GET',
      };

      const data = await request(requestConfig);

      if (data) {
        setClientData(data);
      }
    }

    if (params.id) {
      getClient(Number(params.id));
    }
  });

  function formIsInvalid(): boolean {
    const formValid = !!(name?.length && address?.length);
    return !formValid;
  }

  function handleSaveClick(): void {
    if (client?.id) {
      _editClient();
      return;
    }
    _createNewClient();
  }

  function setClientData(client: ClientModel): void {
    const { name, address } = client;
    setClient(client);
    setName(name);
    setAddress(address);
  }

  async function _createNewClient() {
    const client = {
      name,
      address,
    };

    const newClientRequest: AxiosRequestConfig = {
      url: '/clients',
      method: 'POST',
      data: client,
    };

    const data = await request(newClientRequest);

    if (data) {
      navigate('/clients');
    }
  }

  async function _editClient() {
    const data = {
      id: client?.id,
      name,
      address,
    };

    const editRequest: AxiosRequestConfig = {
      url: `/clients/${client?.id}`,
      method: 'PUT',
      data,
    };

    const response = await request(editRequest);

    if (response) {
      navigate('/clients');
    }
  }

  return (
    <Layout>
      <PageHeader
        title={params.id ? 'Editar cliente' : 'Adicionar cliente'}
        btnText="Salvar"
        handleBtnClick={() => handleSaveClick()}
        showProgress={loading}
        disableBtn={formIsInvalid()}
      />
      <form className="flex flex-col items-center justify-center gap-3 mt-2">
        <Input
          placeHolder="Nome"
          value={name}
          setValue={(value) => setName(value)}
          disabled={loading}
          name="nome"
          id="nome"
        />
        <input
          className="w-full p-4 border rounded focus:ring-indigo-600 focus:ring-2 outline-none"
          placeholder="Endereço"
          type="text"
          name="address"
          id="address"
          onChange={({ target }) => setAddress(target.value)}
          value={address}
          autoComplete="off"
          maxLength={100}
          disabled={loading}
        />
      </form>
    </Layout>
  );
};

export default ClientForm;
