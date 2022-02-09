import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import Datatable, { ColumnDefinition } from '../../../components/Datatable';
import { IconDelete } from '../../../components/icons/IconDelete';
import { IconEdit } from '../../../components/icons/IconEdit';
import { ServiceModel } from '../../../core/models/service.model';

interface ServiceTableProps {
  services: ServiceModel[];
  handleRemove: (id: number) => void;
}

const ServiceTable = ({ services, handleRemove }: ServiceTableProps) => {
  const navigate = useNavigate();

  function handleEditClick(id: number) {
    navigate(`${id}/edit`);
  }

  const columns: ColumnDefinition[] = [
    {
      title: 'Descrição do serviço',
      property: 'description',
      type: 'text',
    },
    {
      title: 'Ações',
      type: 'action',
      actionElement: (id) => (
        <div className="flex gap-2 ">
          <Button
            icon={IconEdit}
            handleClick={() => handleEditClick(id)}
            color="Indigo"
          />
          <Button icon={IconDelete} handleClick={() => handleRemove(id)} color="Red" />
        </div>
      ),
    },
  ];

  return <Datatable datasource={services} columns={columns} />;
};

export default ServiceTable;
