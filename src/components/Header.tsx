import React from 'react';

import { NavLink, Link } from 'react-router-dom';

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
            <NavLink className="hover:bg-indigo-800 p-2 rounded" to="/clients">
              Clientes
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
