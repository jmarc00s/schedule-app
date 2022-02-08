import React from 'react';
import { useNavigate } from 'react-router';
import Button from '../../../components/Button';
import { IconDelete } from '../../../components/icons/IconDelete';
import { IconEdit } from '../../../components/icons/IconEdit';
import { ClientModel } from '../../../models/client.model';

interface ClientTableProps {
  clients: ClientModel[];
  handleRemoveClick: (id: number) => void;
}

const ClientTable = ({ clients, handleRemoveClick }: ClientTableProps) => {
  const navigate = useNavigate();

  function handleEditClick(id: number) {
    navigate(`/clients/${id}/edit`);
  }

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>Endereço</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {clients?.map(({ id, name, address }) => (
          <tr key={id}>
            <td className="text-center">{id}</td>
            <td className="text-center">{name}</td>
            <td className="text-center">{address}</td>
            <td className="flex gap-2 items-center justify-center">
              <Button
                icon={IconEdit}
                handleClick={() => handleEditClick(id)}
                color="Indigo"
              />
              <Button
                icon={IconDelete}
                handleClick={() => handleRemoveClick(id)}
                color="Red"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientTable;
