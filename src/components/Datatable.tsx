import { ReactNode } from 'react';

export type ColumnType = 'text' | 'action';

export interface ColumnDefinition {
  title: string;
  type: ColumnType;
  property?: string;
  actionElement?: (id: number) => ReactNode;
}

interface DatatableProps {
  columns: ColumnDefinition[];
  datasource: any[];
  idProperty?: string;
}

const Datatable = ({ columns, datasource, idProperty }: DatatableProps) => {
  function renderTableData(data: any) {
    return columns.map(({ property, type, actionElement: actionColumn }) => {
      switch (type) {
        case 'text':
          return property && <td className="p-5">{data[property]}</td>;
        case 'action':
          if (actionColumn) {
            return (
              <td className="p-5 flex items-center">
                {actionColumn(data[idProperty ? idProperty : 'id'])}
              </td>
            );
          }
          return <td className="p-5"></td>;
        default:
          return null;
      }
    });
  }

  return (
    <div className="shadow border-b border-gray-200 rounded-sm">
      <table className="min-w-full table-auto">
        <thead className="bg-indigo-600 text-gray-50 mb-5">
          <tr>
            {columns.map((column, index) => (
              <th
                className={`text-left px-5 py-3 uppercase text-sm font-medium tracking-wider ${
                  index === 0 ? 'rounded-tl-sm' : ''
                } ${index === columns.length - 1 ? 'rounded-tr-sm' : ''}`}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {datasource.map((data, index) => (
            <tr
              key={index}
              className={`${index % 2 === 1 ? 'bg-indigo-100' : ''} font-light text-lg`}
            >
              {renderTableData(data)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Datatable;
