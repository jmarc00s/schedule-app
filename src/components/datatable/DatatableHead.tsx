import React from 'react';
import { ColumnDefinition } from './Datatable';

interface DatatableHeadProps {
  columns: ColumnDefinition[];
}

const DatatableHead = ({ columns }: DatatableHeadProps) => {
  return (
    <thead className="bg-indigo-600 text-gray-50 mb-5 ">
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
  );
};

export default DatatableHead;
