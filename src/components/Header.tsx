import React from 'react';

import { NavLink, Link } from 'react-router-dom';

interface HeaderLinkProps {
  label: string;
  to: string;
}

const HeaderLink = ({ label, to }: HeaderLinkProps) => {
  return (
    <NavLink className="hover:bg-indigo-800 p-2 rounded" to={to}>
      {label}
    </NavLink>
  );
};

const Header = () => {
  return (
    <header className="bg-indigo-600 text-white flex h-16 items-center content-between px-10">
      <Link to="/" className="font-bold text-lg">
        SchedulerApp
      </Link>
      <span className="flex-1"></span>
      <nav>
        <ul className="flex">
          <li>
            <HeaderLink label="Clientes" to="/clients" />
          </li>
          <li>
            <HeaderLink label="Horários" to="/schedules" />
          </li>
          <li>
            <HeaderLink label="Serviços" to="/services" />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
