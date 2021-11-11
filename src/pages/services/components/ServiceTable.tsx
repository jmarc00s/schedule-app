import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import { ServiceModel } from '../../../models/service.model';

interface ServiceTableProps {
  services: ServiceModel[];
  handleRemove: (id: number) => void;
}

const ServiceTable = ({ services, handleRemove }: ServiceTableProps) => {
  const navigate = useNavigate();

  function handleEditClick(id: number) {
    navigate(`${id}/edit`);
  }

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>Id</th>
          <th>Descrição</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {services?.map(({ id, description }) => (
          <tr key={id}>
            <td className="text-center">{id}</td>
            <td className="text-center">{description}</td>
            <td className="text-center">
              <Button
                label="Editar"
                handleClick={() => handleEditClick(id)}
                color="Indigo"
              />
              <Button label="Remover" handleClick={() => handleRemove(id)} color="Red" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ServiceTable;
