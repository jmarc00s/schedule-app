import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAxios } from '../../core/hooks/useAxios';
import { AxiosRequestConfig } from 'axios';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';

import { ClientModel } from '../../core/models/client.model';
import Layout from '../../components/template/Layout';
import { useToast } from 'src/core/hooks/useToast';

const ClientForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [client, setClient] = React.useState<ClientModel | undefined>(undefined);
  const { request, loading } = useAxios<ClientModel>();
  const [name, setName] = React.useState<string>('');
  const [address, setAddress] = React.useState<string>('');
  const { showSuccessToast } = useToast();

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
  }, [params.id]);

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
      showSuccessToast('Cliente criado com sucesso!');
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
      showSuccessToast('Cliente editado com sucesso!');
    }
  }

  return (
    <section>
      <PageHeader
        title={params.id ? 'Editar cliente' : 'Adicionar cliente'}
        btnText="Salvar"
        handleBtnClick={() => handleSaveClick()}
        showProgress={loading}
        disableBtn={formIsInvalid()}
      />
      <form className="flex flex-col gap-3 mt-2">
        <Input
          label="Nome"
          placeholder="Nome"
          value={name}
          onChange={({ target }) => setName(target.value)}
          disabled={loading}
          name="nome"
          id="nome"
        />
        <Input
          name="address"
          id="address"
          label="Endereço"
          placeholder="Endereço"
          onChange={({ target }) => setAddress(target.value)}
          value={address}
          maxLength={100}
          disabled={loading}
        />
      </form>
    </section>
  );
};

export default ClientForm;
