import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAxios } from '../../core/hooks/useAxios';
import { AxiosRequestConfig } from 'axios';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';

import { ClientModel } from '../../core/models/client.model';
import { useToast } from 'src/core/hooks/useToast';
import { useForm } from 'react-hook-form';

interface clientFormData {
  name: string;
  address: string;
}

const ClientForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [client, setClient] = React.useState<ClientModel | undefined>(undefined);
  const { request, loading } = useAxios<ClientModel>();
  const { showSuccessToast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<clientFormData>();

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

  function onSubmit(data: clientFormData): void {
    if (client?.id) {
      _editClient(data);
      return;
    }
    _createNewClient(data);
  }

  function setClientData(client: ClientModel): void {
    const { name, address } = client;
    setClient(client);
    reset({ name, address });
  }

  async function _createNewClient(data: clientFormData) {
    const newClientRequest: AxiosRequestConfig = {
      url: '/clients',
      method: 'POST',
      data,
    };

    const response = await request(newClientRequest);

    if (response) {
      navigate('/clients');
      showSuccessToast('Cliente criado com sucesso!');
    }
  }

  async function _editClient({ name, address }: clientFormData) {
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
        handleBtnClick={handleSubmit(onSubmit)}
        showProgress={loading}
        disableBtn={!!errors.address || !!errors.name}
      />
      <form className="flex flex-col mt-2">
        <Input
          placeholder="Nome"
          register={register}
          disabled={loading}
          name="name"
          label="Nome"
          validation={{ required: true }}
          errors={errors.name}
        />
        <Input
          label="Endereço"
          name="address"
          placeholder="Endereço"
          register={register}
          maxLength={100}
          disabled={loading}
          validation={{ required: true }}
          errors={errors.address}
        />
      </form>
    </section>
  );
};

export default ClientForm;
