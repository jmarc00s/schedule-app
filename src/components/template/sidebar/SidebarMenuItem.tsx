import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarMenuItemProps {
  label: string;
  href: string;
  icon: ReactNode;
}

const SidebarMenuItem = ({ label, href, icon }: SidebarMenuItemProps) => {
  return (
    <li className="hover:bg-indigo-600 hover:text-gray-50 text-gray-500 cursor-pointer flex flex-1 rounded w-full">
      <NavLink
        className={({ isActive }) =>
          isActive ? `bg-indigo-600 text-gray-50 w-full rounded` : 'w-full'
        }
        to={href}
      >
        <div className="flex flex-1 flex-col justify-center items-center h-20">
          {icon}
          <span className="text-sm font-light mt-1">{label}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default SidebarMenuItem;
