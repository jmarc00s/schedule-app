import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from 'src/core/hooks/useToast';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';
import Layout from '../../components/template/Layout';
import { EStatusSchedule } from '../../core/enum/status-schedule.enum';
import { useAxios } from '../../core/hooks/useAxios';
import { ClientModel } from '../../core/models/client.model';
import { ScheduleModel } from '../../core/models/schedule.model';
import { ServiceModel } from '../../core/models/service.model';

interface ScheduleFormModel {
  client: ClientModel | undefined;
  service: ServiceModel | undefined;
  date: string;
  time: string;
}

const ScheduleForm = () => {
  const [form, setForm] = React.useState<ScheduleFormModel | undefined>({
    date: new Date().toLocaleDateString(),
    time: '',
    client: undefined,
    service: undefined,
  });
  const [clients, setClients] = React.useState<ClientModel[]>([]);
  const [services, setServices] = React.useState<ServiceModel[]>([]);
  const { request: requestClients, loading: loadingClients } = useAxios<ClientModel[]>();
  const { request: requestServices, loading: loadingServices } =
    useAxios<ServiceModel[]>();
  const { request, loading: saving, error } = useAxios<ScheduleModel>();
  const navigate = useNavigate();
  const { showSuccessToast } = useToast();

  React.useEffect(() => {
    async function getClients() {
      const data = await requestClients({ url: '/clients' });

      if (data) {
        setClients(data);
      }
    }

    async function getServices() {
      const data = await requestServices({ url: '/services' });
      if (data) {
        setServices(data);
      }
    }

    getClients();
    getServices();
  }, []);

  async function handleSaveClick() {
    const schedule = {
      ...form,
      status: EStatusSchedule.PENDING,
      clientId: form?.client?.id,
      serviceId: form?.service?.id,
    } as ScheduleModel;

    await request({ url: '/schedules', method: 'POST', data: schedule });

    if (!error) {
      showSuccessToast('Horário criado com sucesso!');
      navigate('/schedules');
    }
  }

  function handleClientSelectChange(id: number) {
    const client = clients.find((client) => client.id === id);
    setForm({ ...form, client } as ScheduleFormModel);
  }

  function handleServiceSelectChange(id: number) {
    const service = services.find((service) => service.id === id);
    setForm({ ...form, service } as ScheduleFormModel);
  }

  return (
    <Layout>
      <PageHeader
        title="Adicionando horário"
        showProgress={loadingClients || loadingServices || saving}
        btnText="Salvar"
        handleBtnClick={handleSaveClick}
      />

      <form className="flex flex-col mt-3">
        <Select
          property="name"
          label="Cliente"
          placeholder="Selecione um cliente"
          values={clients}
          handleSelectChange={(id) => handleClientSelectChange(id)}
        />
        <Select
          property="description"
          label="Serviço"
          placeholder="Selecione um serviço"
          values={services}
          handleSelectChange={(id) => handleServiceSelectChange(id)}
        />
        <div className="flex flex-col md:flex-row mt-3">
          <div className="md:mr-5  w-full">
            <Input
              label="Data"
              disabled={saving}
              placeHolder="DD/MM/YYYY"
              value={form?.date}
              setValue={(value) => setForm({ ...form, date: value } as ScheduleFormModel)}
            />
          </div>
          <div className="w-full">
            <Input
              label="Horário"
              disabled={saving}
              placeHolder="HH:mm"
              value={form?.time}
              setValue={(value) => setForm({ ...form, time: value } as ScheduleFormModel)}
            />
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default ScheduleForm;
