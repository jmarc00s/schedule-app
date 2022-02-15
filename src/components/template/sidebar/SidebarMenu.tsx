import { IconCalendar } from '../../icons/IconCalendar';
import { IconClipboard } from '../../icons/IconClipboard';
import { IconHome } from '../../icons/IconHome';
import { IconUserGroup } from '../../icons/IconUserGroup';
import { IconLogout } from '../../icons/IconLogout';

import SidebarMenuItem from './SidebarMenuItem';
import useAuth from 'src/core/hooks/useAuth';

const SidebarMenu = () => {
  const { logout } = useAuth();

  return (
    <nav className="h-full flex flex-col py-2">
      <ul className="flex flex-col flex-1 gap-2">
        <SidebarMenuItem label="Início" to="/" icon={IconHome} />
        <SidebarMenuItem label="Horários" to="/schedules" icon={IconCalendar} />
        <SidebarMenuItem label="Clientes" to="/clients" icon={IconUserGroup} />
        <SidebarMenuItem label="Serviços" to="/services" icon={IconClipboard} />
      </ul>
      <ul className="flex flex-col flex-1 justify-end">
        <SidebarMenuItem label="Sair" icon={IconLogout} onClick={() => logout()} />
      </ul>
    </nav>
  );
};

export default SidebarMenu;
