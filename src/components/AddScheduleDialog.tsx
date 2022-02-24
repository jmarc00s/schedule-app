import React from 'react';
import { useForm } from 'react-hook-form';
import { ClientModel } from 'src/core/models/client.model';
import { ServiceModel } from 'src/core/models/service.model';
import { datePattern, hourPattern } from 'src/utils/regex';
import BaseDialog from './BaseDialog';
import Input from './Input';
import Select from './Select';

interface AddScheduleDialogProps {
  open: boolean;
  onClose?: () => void;
  setOpen: (open: boolean) => void;
}

interface ScheduleFormModel {
  client: ClientModel | undefined;
  clientId: number;
  service: ServiceModel | undefined;
  serviceId: number;
  date: string;
  time: string;
}

function AddScheduleDialog({ open, onClose, setOpen }: AddScheduleDialogProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ScheduleFormModel>();

  function onSubmit(data: ScheduleFormModel) {
    console.log(data);
  }

  return (
    <BaseDialog
      title="Adicionar um horário"
      open={open}
      onClose={() => onClose}
      setOpen={setOpen}
      confirmButtonLabel="Salvar"
      onConfirm={handleSubmit(onSubmit)}
    >
      <form className="flex flex-col mt-3">
        <div className="flex flex-col md:flex-row ">
          <div className="md:mr-5 w-full">
            {/* <Select
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
            /> */}
          </div>
        </div>
        <div className="flex flex-col mt-3">
          <div className="md:mr-5 w-full">
            <Input
              label="Data"
              disabled={false}
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
              disabled={false}
              placeholder="HH:mm"
              register={register}
              name="time"
              errors={errors.time}
              validation={{ required: true, pattern: hourPattern }}
            />
          </div>
        </div>
      </form>
    </BaseDialog>
  );
}

export default AddScheduleDialog;
