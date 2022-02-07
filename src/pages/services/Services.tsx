import { AxiosRequestConfig } from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import Layout from '../../components/template/Layout';
import { useAxios } from '../../hooks/useAxios';
import { ServiceModel } from '../../models/service.model';
import ServiceTable from './components/ServiceTable';

const Services = () => {
  const navigate = useNavigate();
  const { request, loading, error } = useAxios<ServiceModel[]>();

  const [services, setServices] = useState<ServiceModel[]>([]);

  React.useEffect(() => {
    async function getServices() {
      const requestConfig: AxiosRequestConfig = {
        url: '/services',
        method: 'GET',
      };

      const services = await request(requestConfig);

      if (services) {
        setServices(services);
      }
    }

    getServices();
  }, []);

  function handleAddServiceClick() {
    navigate('/services/add');
  }

  async function handleRemove(id: number) {
    const requestConfig: AxiosRequestConfig = {
      url: `/services/${id}`,
      method: 'DELETE',
    };

    await request(requestConfig);

    if (!error) {
      setServices(services.filter((service) => service.id !== id));
    }
  }

  return (
    <Layout>
      <PageHeader
        title="Serviços"
        btnText="Adicionar serviço"
        showProgress={loading}
        handleBtnClick={handleAddServiceClick}
      />

      {!!services.length ? (
        <ServiceTable services={services} handleRemove={handleRemove} />
      ) : (
        <p className="text-center">Não existem serviços cadastrados.</p>
      )}
    </Layout>
  );
};

export default Services;
