import React from 'react';
import { Link } from 'react-router-dom';
import { IconCalendar } from '../../icons/IconCalendar';
import SidebarMenu from './SidebarMenu';

const Sidebar = () => {
  return (
    <aside className="w-28 flex flex-col bg-white text-gray-900">
      <div className=" flex items-center justify-center h-12 bg-indigo-600 text-gray-50">
        <Link to="/" className="font-bold text-lg">
          {IconCalendar}
        </Link>
      </div>
      <SidebarMenu />
    </aside>
  );
};

export default Sidebar;
