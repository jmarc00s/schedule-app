import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface SidebarMenuItemProps {
  label: string;
  href: string;
  icon: ReactNode;
}

const SidebarMenuItem = ({ label, href, icon }: SidebarMenuItemProps) => {
  return (
    <li className="hover:bg-indigo-600 hover:text-gray-50 text-gray-500 cursor-pointer flex flex-1 rounded">
      <Link className="w-full" to={href}>
        <div className="flex flex-1 flex-col justify-center items-center h-20">
          {icon}
          <span className="text-xs font-light mt-1">{label}</span>
        </div>
      </Link>
    </li>
  );
};

export default SidebarMenuItem;
