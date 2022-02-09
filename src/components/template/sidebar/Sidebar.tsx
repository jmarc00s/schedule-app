import React from 'react';

import SidebarMenu from './SidebarMenu';

const Sidebar = () => {
  return (
    <aside className="w-32 flex flex-col bg-white text-gray-900">
      <SidebarMenu />
    </aside>
  );
};

export default Sidebar;
