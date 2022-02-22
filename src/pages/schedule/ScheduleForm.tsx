import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from 'src/core/hooks/useToast';
import { datePattern, hourPattern } from 'src/utils/regex';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';
import { EStatusSchedule } from '../../core/enum/status-schedule.enum';
import { useAxios } from '../../core/hooks/useAxios';
import { ClientModel } from '../../core/models/client.model';
import { ScheduleModel } from '../../core/models/schedule.model';
import { ServiceModel } from '../../core/models/service.model';

interface ScheduleFormModel {
  client: ClientModel | undefined;
  clientId: number;
  service: ServiceModel | undefined;
  serviceId: number;
  date: string;
  time: string;
}

const ScheduleForm = () => {
  const [clients, setClients] = React.useState<ClientModel[]>([]);
  const [services, setServices] = React.useState<ServiceModel[]>([]);
  const { request: requestClients, loading: loadingClients } = useAxios<ClientModel[]>();
  const { request: requestServices, loading: loadingServices } =
    useAxios<ServiceModel[]>();
  const { request, loading: saving, error } = useAxios<ScheduleModel>();
  const navigate = useNavigate();
  const { showSuccessToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ScheduleFormModel>();

  useEffect(() => {
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

    const subscription = watch((value, { name, type }) => {
      console.log(value);
      if (type !== 'change') return;

      if (name === 'clientId') {
        const client = clients.find((client) => client.id === Number(value.clientId));
        setValue('client', client);
        return;
      }

      if (name === 'serviceId') {
        const service = services.find(
          (service) => service.id === Number(value?.serviceId)
        );
        setValue('service', service);
        return;
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function onSubmit(data: ScheduleFormModel) {
    const schedule = {
      ...data,
      status: EStatusSchedule.PENDING,
      clientId: data?.client?.id,
      serviceId: data?.service?.id,
    } as ScheduleModel;

    await request({ url: '/schedules', method: 'POST', data: schedule });

    if (!error) {
      showSuccessToast('Horário criado com sucesso!');
      navigate('/schedules');
    }
  }

  return (
    <section>
      <PageHeader
        title="Adicionar horário"
        showProgress={loadingClients || loadingServices || saving}
        btnText="Salvar"
        handleBtnClick={handleSubmit(onSubmit)}
      />

      <form className="flex flex-col mt-3">
        <div className="flex flex-col md:flex-row ">
          <div className="md:mr-5 w-full">
            <Select
              name="clientId"
              property="name"
              label="Cliente"
              placeholder="Selecione um cliente"
              values={clients}
              register={register}
              errors={errors.client}
              validation={{ required: true }}
            />
          </div>
          <div className="w-full">
            <Select
              name="serviceId"
              property="description"
              values={services}
              label="Serviço"
              placeholder="Selecione um serviço"
              register={register}
              errors={errors.service}
              validation={{ required: true }}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row mt-3">
          <div className="md:mr-5 w-full">
            <Input
              label="Data"
              disabled={saving}
              placeholder="DD/MM/YYYY"
              register={register}
              name="date"
              errors={errors.date}
              validation={{ required: true, pattern: datePattern }}
            />
          </div>
          <div className="w-full">
            <Input
              label="Horário"
              disabled={saving}
              placeholder="HH:mm"
              register={register}
              name="time"
              errors={errors.time}
              validation={{ required: true, pattern: hourPattern }}
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default ScheduleForm;
