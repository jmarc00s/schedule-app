import { AxiosRequestConfig } from 'axios';
import React from 'react';
import { useNavigate } from 'react-router';
import Button from '../../../components/Button';
import { useAxios } from '../../../hooks/useAxios';
import { ClientModel } from '../../../models/client.model';

interface ClientTableProps {
  clients: ClientModel[];
}

const ClientTable = ({ clients }: ClientTableProps) => {
  const navigate = useNavigate();

  const { request } = useAxios();

  function handleEditClick(id: number) {
    navigate(`/clients/${id}/edit`);
  }

  async function handleRemoveClick(id: number) {
    var requestConfig: AxiosRequestConfig = {
      url: `/clients/${id}`,
      method: 'DELETE',
    };

    await request(requestConfig);
  }

  return (
    <table className="w-full">
      <thead>
        <th>Id</th>
        <th>Nome</th>
        <th>Endereço</th>
        <th>Ações</th>
      </thead>
      <tbody>
        {clients?.map(({ id, name, address }) => (
          <tr key={id}>
            <td className="text-center">{id}</td>
            <td className="text-center">{name}</td>
            <td className="text-center">{address}</td>
            <td className="flex gap-2 items-center justify-center">
              <Button
                label="Editar"
                handleClick={() => handleEditClick(id)}
                color="Green"
              />
              <Button
                label="Remover"
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
