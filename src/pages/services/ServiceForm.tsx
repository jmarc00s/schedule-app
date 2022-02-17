import { AxiosRequestConfig } from 'axios';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from 'src/core/hooks/useToast';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import { useAxios } from '../../core/hooks/useAxios';
import { ServiceModel } from '../../core/models/service.model';

const ServiceForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { request, loading } = useAxios<ServiceModel | undefined>();
  const [description, setDescription] = React.useState<string>('');
  const { showSuccessToast } = useToast();

  React.useEffect(() => {
    async function getService(id: number) {
      const requestConfig: AxiosRequestConfig = {
        method: 'GET',
        url: `/services/${id}`,
      };

      const data = await request(requestConfig);

      if (data) {
        setDescription(data.description);
      }
    }

    if (params.id) {
      getService(Number(params.id));
    }
  }, [params.id]);

  function handleSaveClick() {
    if (params.id) {
      _editService();
      return;
    }
    _createNewService();
  }

  async function _editService() {
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

  async function _createNewService() {
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
        title={params?.id ? 'Editando serviço' : 'Adicionando serviço'}
        btnText="Salvar"
        showProgress={false}
        handleBtnClick={() => handleSaveClick()}
        disableBtn={!description.length}
      />
      <div className="mt-5">
        <Input
          label="Descrição"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          placeholder="Descrição"
          disabled={loading}
        />
      </div>
    </section>
  );
};

export default ServiceForm;
