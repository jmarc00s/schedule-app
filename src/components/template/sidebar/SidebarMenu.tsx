import { IconCalendar } from '../../icons/IconCalendar';
import { IconClipboard } from '../../icons/IconClipboard';
import { IconHome } from '../../icons/IconHome';
import { IconUserGroup } from '../../icons/IconUserGroup';

import SidebarMenuItem from './SidebarMenuItem';

const SidebarMenu = () => {
  return (
    <nav>
      <ul className="flex flex-col flex-1 mt-5 px-2 gap-2">
        <SidebarMenuItem label="Início" href="/" icon={IconHome} />
        <SidebarMenuItem label="Horários" href="/schedules" icon={IconCalendar} />
        <SidebarMenuItem label="Clientes" href="/clients" icon={IconUserGroup} />
        <SidebarMenuItem label="Serviços" href="/services" icon={IconClipboard} />
      </ul>
    </nav>
  );
};

export default SidebarMenu;
