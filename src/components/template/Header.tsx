import Avatar from '../Avatar';
import IconBadge from '../IconBadge';
import { IconCalendar } from '../icons/IconCalendar';
import { IconNotification } from '../icons/IconNotification';

const Header = () => {
  return (
    <header className="bg-indigo-600 text-white flex h-16 items-center content-between px-10">
      <div className="flex items-center text-lg font-semibold">ScheduleApp</div>
      <div className="flex-1"></div>
      <div className="flex items-center relative gap-5">
        <IconBadge icon={IconCalendar} value={5} />
        <IconBadge icon={IconNotification} value={5} />
        <Avatar />
      </div>
    </header>
  );
};

export default Header;
