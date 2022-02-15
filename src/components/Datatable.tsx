import { ReactNode } from 'react';

export type ColumnType = 'text' | 'action' | 'element';

export interface ColumnDefinition {
  title: string;
  type: ColumnType;
  property?: string;
  renderText?: (element: any) => string;
  element?: (element?: any) => ReactNode;
  actionElement?: (id: number, element?: any) => ReactNode;
}

interface DatatableProps {
  columns: ColumnDefinition[];
  datasource: any[];
  idProperty?: string;
}

const Datatable = ({ columns, datasource, idProperty }: DatatableProps) => {
  function renderTextColumn(
    data: any,
    property?: string,
    renderText?: (element: any) => string
  ) {
    if (property) {
      return <td className="p-5">{data[property]}</td>;
    }

    if (renderText) {
      return <td className="p-5">{renderText(data)}</td>;
    }

    return null;
  }

  function renderTableData(data: any) {
    return columns.map(
      ({ property, type, actionElement: actionColumn, element, renderText }) => {
        switch (type) {
          case 'text':
            return renderTextColumn(data, property, renderText);
          case 'action':
            if (actionColumn) {
              return (
                <td className="p-5 flex items-center">
                  {actionColumn(data[idProperty ? idProperty : 'id'], data)}
                </td>
              );
            }
            return <td className="p-5"></td>;
          case 'element':
            return element && <td className="p-5">{element(data)}</td>;
          default:
            return null;
        }
      }
    );
  }

  return (
    <div className="shadow border-b border-gray-200 rounded-sm">
      <table className="min-w-full table-auto">
        <thead className="bg-indigo-600 text-gray-50 mb-5">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
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
