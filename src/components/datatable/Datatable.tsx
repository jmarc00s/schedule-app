import { ReactNode } from 'react';
import DatatableBody from './DatatableBody';
import DatatableHead from './DatatableHead';

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
  children?: any;
}

const Datatable = ({ columns, datasource, idProperty, children }: DatatableProps) => {
  return (
    <div className="border-b border-gray-200 rounded-sm shadow">
      <table className="min-w-full table-auto">
        <DatatableHead columns={columns} />
        <DatatableBody
          columns={columns}
          datasource={datasource}
          idProperty={idProperty}
        />
      </table>
      {children}
    </div>
  );
};

export default Datatable;
