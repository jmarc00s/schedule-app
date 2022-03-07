import { IconCalendar } from '../../icons/IconCalendar';
import { IconClipboard } from '../../icons/IconClipboard';
import { IconHome } from '../../icons/IconHome';
import { IconUserGroup } from '../../icons/IconUserGroup';
import { IconLogout } from '../../icons/IconLogout';

import SidebarMenuItem from './SidebarMenuItem';
import useAuth from 'src/core/hooks/useAuth';
import ConfirmDialog from 'src/components/ConfirmDialog';
import { useState } from 'react';

const SidebarMenu = () => {
  const { logout } = useAuth();
  const [open, setOpen] = useState(false);

  function handleLogoutClick() {
    setOpen(true);
  }

  return (
    <>
      <nav className="flex flex-col h-full py-2">
        <ul className="flex flex-col flex-1 gap-2">
          <SidebarMenuItem label="Início" to="/" icon={IconHome} />
          <SidebarMenuItem label="Horários" to="/schedules" icon={IconCalendar} />
          <SidebarMenuItem label="Clientes" to="/clients" icon={IconUserGroup} />
          <SidebarMenuItem label="Serviços" to="/services" icon={IconClipboard} />
        </ul>
        <ul className="flex flex-col justify-end flex-1">
          <SidebarMenuItem label="Sair" icon={IconLogout} onClick={handleLogoutClick} />
        </ul>
      </nav>
      <ConfirmDialog
        open={open}
        setOpen={setOpen}
        description="Deseja realmente sair da aplicação ?"
        onConfirm={() => logout()}
      />
    </>
  );
};

export default SidebarMenu;
