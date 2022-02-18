import { Outlet } from 'react-router-dom';

import Content from './Content';
import Header from './Header';
import Sidebar from './sidebar/Sidebar';

const Layout = () => {
  return (
    <section className="flex flex-col flex-auto min-w-0">
      <Header />
      <section className="flex flex-1">
        <Sidebar />
        <Content>
          <Outlet />
        </Content>
      </section>
    </section>
  );
};

export default Layout;
