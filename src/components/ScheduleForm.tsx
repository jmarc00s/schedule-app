import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { EStatusSchedule } from 'src/core/enum/status-schedule.enum';
import { useAxios } from 'src/core/hooks/useAxios';
import { useToast } from 'src/core/hooks/useToast';
import { ClientModel } from 'src/core/models/client.model';
import { ScheduleModel } from 'src/core/models/schedule.model';
import { ServiceModel } from 'src/core/models/service.model';
import { datePattern, hourPattern } from 'src/utils/regex';
import Input from './Input';
import Select from './Select';

export interface ScheduleFormModel {
  client: ClientModel | undefined;
  clientId: number;
  service: ServiceModel | undefined;
  serviceId: number;
  date: string;
  time: string;
}

interface ScheduleFormProps {
  submit: boolean;
  setSubmit: (submit: false) => void;
  afterSubmit: (success: boolean) => void;
}

function ScheduleForm({ afterSubmit, submit, setSubmit }: ScheduleFormProps) {
  const [clients, setClients] = useState<ClientModel[]>([]);
  const [services, setServices] = useState<ServiceModel[]>([]);
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    handleSubmit,
  } = useForm<ScheduleFormModel>();
  const { request: requestClients } = useAxios<ClientModel[]>();
  const { request: requestServices } = useAxios<ServiceModel[]>();
  const { request, loading: saving, error } = useAxios<ScheduleModel>();
  const { showSuccessToast, showWarningToast } = useToast();

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
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type !== 'change') return;

      if (name === 'clientId') {
        const client = clients?.find((client) => client.id === Number(value.clientId));
        setValue('client', client);
        return;
      }

      if (name === 'serviceId') {
        const service = services?.find(
          (service) => service.id === Number(value?.serviceId)
        );
        setValue('service', service);
        return;
      }
    });

    return () => subscription.unsubscribe();
  }, [clients.length, services.length]);

  useEffect(() => {
    if (submit) {
      setSubmit(false);
      handleSubmit(onSubmit)();
    }
  }, [submit]);

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
      afterSubmit(true);
      return;
    }

    showWarningToast('Não foi possível criar horário.');
    afterSubmit(false);
  }

  return (
    <form className="flex flex-col mt-3">
      <div className="flex flex-col md:flex-row ">
        <div className="md:mr-5 w-full">
          <Select
            name="clientId"
            property="name"
            label="Cliente"
            placeholder="Selecione um cliente"
            values={clients ?? []}
            register={register}
            errors={errors.client}
            validation={{ required: true }}
          />
        </div>
        <div className="w-full">
          <Select
            name="serviceId"
            property="description"
            values={services ?? []}
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
  );
}

export default ScheduleForm;
