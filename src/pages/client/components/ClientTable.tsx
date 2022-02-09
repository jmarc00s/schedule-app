import { useNavigate } from 'react-router';
import Button from '../../../components/Button';
import Datatable, { ColumnDefinition } from '../../../components/Datatable';
import { IconDelete } from '../../../components/icons/IconDelete';
import { IconEdit } from '../../../components/icons/IconEdit';
import { ClientModel } from '../../../core/models/client.model';

interface ClientTableProps {
  clients: ClientModel[];
  handleRemoveClick: (id: number) => void;
}

const ClientTable = ({ clients, handleRemoveClick }: ClientTableProps) => {
  const navigate = useNavigate();

  const columns: ColumnDefinition[] = [
    {
      title: 'Nome',
      property: 'name',
      type: 'text',
    },
    {
      title: 'Endereço',
      property: 'address',
      type: 'text',
    },
    {
      title: 'Ações',
      property: 'actions',
      type: 'action',
      actionElement: (id) => actionElement(id),
    },
  ];

  function handleEditClick(id: number) {
    navigate(`/clients/${id}/edit`);
  }

  const actionElement = (id: number) => (
    <div className="flex gap-3">
      <Button icon={IconEdit} handleClick={() => handleEditClick(id)} color="Indigo" />
      <Button icon={IconDelete} handleClick={() => handleRemoveClick(id)} color="Red" />
    </div>
  );

  return <Datatable columns={columns} datasource={clients} />;
};

export default ClientTable;
