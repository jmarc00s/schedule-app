import { AxiosRequestConfig } from 'axios';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Layout from '../../components/template/Layout';
import { useAxios } from '../../core/hooks/useAxios';
import { ServiceModel } from '../../core/models/service.model';

const ServiceForm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { request, loading } = useAxios<ServiceModel | undefined>();
  const [description, setDescription] = React.useState<string>('');

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
  }, []);

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
      navigate('/services');
    }
  }

  return (
    <Layout>
      <PageHeader
        title={params?.id ? 'Editando serviço' : 'Adicionando serviço'}
        btnText="Salvar"
        showProgress={false}
        handleBtnClick={() => handleSaveClick()}
        disableBtn={!description.length}
      />
      <div className="mt-5">
        <Input
          value={description}
          setValue={(value) => setDescription(value)}
          placeHolder="Descrição"
          disabled={loading}
        />
      </div>
    </Layout>
  );
};

export default ServiceForm;
