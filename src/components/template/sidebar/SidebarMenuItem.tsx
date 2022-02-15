import React, { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarMenuItemProps {
  label: string;
  icon: ReactNode;
  to?: string;
  onClick?: () => void;
}

const SidebarMenuItem = ({ label, to, icon, onClick }: SidebarMenuItemProps) => {
  if (to) {
    return (
      <li className="hover:bg-indigo-600 hover:text-gray-50 text-gray-500 cursor-pointer flex rounded w-full">
        <NavLink
          className={({ isActive }) =>
            isActive ? `bg-indigo-600 text-gray-50 w-full rounded` : 'w-full'
          }
          to={to ?? ''}
        >
          <div className="flex flex-1 flex-col justify-center items-center h-20">
            {icon}
            <span className="text-sm font-light mt-1">{label}</span>
          </div>
        </NavLink>
      </li>
    );
  }

  if (onClick) {
    return (
      <li
        className="hover:bg-indigo-600 hover:text-gray-50 text-gray-500 cursor-pointer flex rounded w-full"
        onClick={onClick}
      >
        <div className="flex flex-1 flex-col justify-center items-center h-20">
          {icon}
          <span className="text-sm font-light mt-1">{label}</span>
        </div>
      </li>
    );
  }

  return null;
};

export default SidebarMenuItem;
