import { AxiosRequestConfig } from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from 'src/core/hooks/useToast';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import { useAxios } from '../../core/hooks/useAxios';
import { ServiceModel } from '../../core/models/service.model';

interface ServiceFormData {
  description: string;
}

const ServiceForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { request, loading } = useAxios<ServiceModel | undefined>();
  const { showSuccessToast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ServiceFormData>();

  useEffect(() => {
    async function getService(id: number) {
      const requestConfig: AxiosRequestConfig = {
        method: 'GET',
        url: `/services/${id}`,
      };

      const data = await request(requestConfig);

      if (data) {
        const { description } = data;
        reset({ description });
      }
    }

    if (params.id) {
      getService(Number(params.id));
    }
  }, [params.id]);

  function onSubmit({ description }: ServiceFormData) {
    if (params.id) {
      _editService(description);
      return;
    }
    _createNewService(description);
  }

  async function _editService(description: string) {
    const service = {
      id: params.id,
      description,
    };

    const requestConfig: AxiosRequestConfig = {
      url: `/services/${params.id}`,
      method: 'PUT',
      data: service,
    };

    const data = await request(requestConfig);

    if (data) {
      showSuccessToast('Serviço editado com sucesso!');
      navigate('/services');
    }
  }

  async function _createNewService(description: string) {
    const service = {
      description,
    };

    const requestConfig: AxiosRequestConfig = {
      url: '/services',
      method: 'POST',
      data: service,
    };

    const data = await request(requestConfig);

    if (data) {
      showSuccessToast('Serviço criado com sucesso!');
      navigate('/services');
    }
  }

  return (
    <section>
      <PageHeader
        title={params?.id ? 'Editar serviço' : 'Adicionar serviço'}
        btnText="Salvar"
        showProgress={false}
        handleBtnClick={handleSubmit(onSubmit)}
        disableBtn={!!errors.description}
      />
      <div className="mt-5">
        <Input
          label="Descrição"
          register={register}
          name="description"
          placeholder="Descrição"
          disabled={loading}
          validation={{ required: true }}
          errors={errors.description}
        />
      </div>
    </section>
  );
};

export default ServiceForm;
