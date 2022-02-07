import React from 'react';
import { Link } from 'react-router-dom';
import { IconCalendar } from '../../icons/IconCalendar';
import { IconHome } from '../../icons/IconHome';
import { IconUserGroup } from '../../icons/IconUserGroup';
import SidebarMenuItem from './SidebarMenuItem';

const Sidebar = () => {
  return (
    <aside className="w-28 flex flex-col bg-white text-gray-900">
      <div className=" flex items-center justify-center h-12 bg-indigo-600 text-gray-50">
        <Link to="/" className="font-bold text-lg">
          {IconCalendar}
        </Link>
      </div>
      <nav>
        <ul className="flex flex-col flex-1 mt-5 px-2">
          <SidebarMenuItem label="Início" href="/" icon={IconHome} />
          <SidebarMenuItem label="Horários" href="/schedules" icon={IconCalendar} />
          <SidebarMenuItem label="Clientes" href="/clients" icon={IconUserGroup} />
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
