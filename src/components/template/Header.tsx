import { NavLink } from 'react-router-dom';
import Avatar from '../Avatar';
import IconBadge from '../IconBadge';
import { IconCalendar } from '../icons/IconCalendar';
import { IconNotification } from '../icons/IconNotification';

const Header = () => {
  return (
    <header className="flex items-center content-between h-16 px-10 text-white bg-indigo-600">
      <NavLink to={'/'}>
        <div className="flex items-center text-lg font-semibold">ScheduleApp</div>
      </NavLink>
      <div className="flex-1"></div>
      <div className="relative flex items-center h-full gap-5">
        <IconBadge icon={IconCalendar} value={5} />
        <IconBadge icon={IconNotification} value={5} />
        <Avatar />
      </div>
    </header>
  );
};

export default Header;
