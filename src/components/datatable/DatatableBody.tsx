import React from 'react';
import { ColumnDefinition } from './Datatable';

interface DatatableBodyProps {
  columns: ColumnDefinition[];
  datasource: any[];
  idProperty?: string;
}

const DatatableBody = ({ datasource, columns, idProperty }: DatatableBodyProps) => {
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
  );
};

export default DatatableBody;
